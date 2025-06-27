import SwiftUI

@main
struct SemainierApp: App {
    @StateObject var tracker = MedicationTracker()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(tracker)
        }
    }
}
