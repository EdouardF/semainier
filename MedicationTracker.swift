import Foundation
import UserNotifications

class MedicationTracker: ObservableObject {
    @Published var taken: [String: [Int: Bool]] = [:] // [Période: [Jour: Bool]]
    @Published var notificationTimes: [String: Date] = [:]
    let periodes = [
        NSLocalizedString("morning", comment: "Matin"),
        NSLocalizedString("noon", comment: "Midi"),
        NSLocalizedString("afternoon", comment: "Après-midi"),
        NSLocalizedString("evening", comment: "Soir")
    ]
    
    init() {
        // Initialisation des prises
        for periode in periodes {
            taken[periode] = [:]
            for jour in 0..<7 {
                taken[periode]?[jour] = false
            }
        }
        // Horaires par défaut
        let calendar = Calendar.current
        notificationTimes[periodes[0]] = calendar.date(bySettingHour: 8, minute: 0, second: 0, of: Date())!
        notificationTimes[periodes[1]] = calendar.date(bySettingHour: 12, minute: 0, second: 0, of: Date())!
        notificationTimes[periodes[2]] = calendar.date(bySettingHour: 16, minute: 0, second: 0, of: Date())!
        notificationTimes[periodes[3]] = calendar.date(bySettingHour: 20, minute: 0, second: 0, of: Date())!
        
        NotificationManager.shared.requestAuthorization()
        scheduleAllNotifications()
    }
    
    func toggle(jour: Int, periode: String) {
        taken[periode]?[jour].toggle()
        objectWillChange.send()
        NotificationManager.shared.cancelNotification(for: periode, day: jour)
    }
    
    func isTaken(jour: Int, periode: String) -> Bool {
        taken[periode]?[jour] ?? false
    }
    
    func setNotificationTime(for periode: String, to date: Date) {
        notificationTimes[periode] = date
        scheduleAllNotifications()
    }
    
    func scheduleAllNotifications() {
        for periode in periodes {
            for jour in 0..<7 {
                NotificationManager.shared.scheduleNotification(for: periode, day: jour, at: notificationTimes[periode] ?? Date())
            }
        }
    }
    
    func resetWeek() {
        for periode in periodes {
            for jour in 0..<7 {
                taken[periode]?[jour] = false
            }
        }
        objectWillChange.send()
        scheduleAllNotifications()
    }
}
