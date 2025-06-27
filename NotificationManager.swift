import Foundation
import UserNotifications

class NotificationManager {
    static let shared = NotificationManager()
    private init() {}
    
    func requestAuthorization() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { _, _ in }
    }
    
    func scheduleNotification(for periode: String, day: Int, at date: Date) {
        let content = UNMutableNotificationContent()
        let notifTitle = String(format: NSLocalizedString("notif_title", comment: "Titre notif"), periode)
        let notifBody = String(format: NSLocalizedString("notif_body", comment: "Corps notif"), periode)
        content.title = notifTitle
        content.body = notifBody
        content.sound = .default
        
        var dateComponents = Calendar.current.dateComponents([.hour, .minute], from: date)
        dateComponents.weekday = ((day + 2) % 7) + 1 // Lundi=2, Dimanche=1
        
        let identifier = "med_\(periode)_\(day)"
        let trigger = UNCalendarNotificationTrigger(dateMatching: dateComponents, repeats: true)
        let request = UNNotificationRequest(identifier: identifier, content: content, trigger: trigger)
        
        UNUserNotificationCenter.current().add(request)
    }
    
    func cancelNotification(for periode: String, day: Int) {
        let identifier = "med_\(periode)_\(day)"
        UNUserNotificationCenter.current().removePendingNotificationRequests(withIdentifiers: [identifier])
    }
}
