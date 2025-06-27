import SwiftUI

struct ContentView: View {
    @EnvironmentObject var tracker: MedicationTracker
    @State private var showingSettings = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 16) {
                Text(NSLocalizedString("title_main", comment: "Titre principal"))
                    .font(.title2)
                    .padding(.top)
                    .foregroundColor(Color.pink)
                
                SemainierTableView()
                    .environmentObject(tracker)
                
                Spacer()
            }
            .navigationBarTitle(NSLocalizedString("title_nav", comment: "Titre navigation"), displayMode: .inline)
            .navigationBarItems(trailing: Button(action: { showingSettings = true }) {
                Image(systemName: "gear")
                    .foregroundColor(Color.pink)
            })
            .sheet(isPresented: $showingSettings) {
                SettingsView()
                    .environmentObject(tracker)
            }
        }
        .accentColor(.pink)
    }
}

struct SemainierTableView: View {
    @EnvironmentObject var tracker: MedicationTracker
    let periodes = [
        NSLocalizedString("morning", comment: "Matin"),
        NSLocalizedString("noon", comment: "Midi"),
        NSLocalizedString("afternoon", comment: "Après-midi"),
        NSLocalizedString("evening", comment: "Soir")
    ]
    let jours = [
        NSLocalizedString("mon", comment: "Lun"),
        NSLocalizedString("tue", comment: "Mar"),
        NSLocalizedString("wed", comment: "Mer"),
        NSLocalizedString("thu", comment: "Jeu"),
        NSLocalizedString("fri", comment: "Ven"),
        NSLocalizedString("sat", comment: "Sam"),
        NSLocalizedString("sun", comment: "Dim")
    ]
    
    var body: some View {
        VStack(spacing: 8) {
            HStack {
                Text("")
                ForEach(jours, id: \.self) { jour in
                    Text(jour)
                        .frame(maxWidth: .infinity)
                        .font(.caption)
                        .foregroundColor(Color.pink)
                }
            }
            ForEach(periodes, id: \.self) { periode in
                HStack {
                    Text(periode)
                        .frame(width: 90, alignment: .leading)
                        .font(.caption)
                        .foregroundColor(Color.pink)
                    ForEach(0..<7) { jour in
                        Button(action: {
                            tracker.toggle(jour: jour, periode: periode)
                        }) {
                            Image(systemName: tracker.isTaken(jour: jour, periode: periode) ? "checkmark.circle.fill" : "circle")
                                .foregroundColor(tracker.isTaken(jour: jour, periode: periode) ? Color.pink : Color(.systemGray3))
                                .font(.title2)
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                }
            }
        }
        .padding()
        .background(Color(red: 1.0, green: 0.9, blue: 0.95))
        .cornerRadius(12)
    }
}

struct SettingsView: View {
    @EnvironmentObject var tracker: MedicationTracker
    var body: some View {
        Form {
            Section(header: Text(NSLocalizedString("notif_times", comment: "Horaires des notifications"))) {
                ForEach(tracker.periodes, id: \.self) { periode in
                    DatePicker(periode, selection: Binding(
                        get: { tracker.notificationTimes[periode] ?? Date() },
                        set: { tracker.setNotificationTime(for: periode, to: $0) }
                    ), displayedComponents: .hourAndMinute)
                }
            }
            Section {
                Button(NSLocalizedString("reset_week", comment: "Réinitialiser la semaine")) {
                    tracker.resetWeek()
                }.foregroundColor(.red)
            }
        }
    }
}
