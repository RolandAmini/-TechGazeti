"use client";

export default function NotificationsPage() {
  // Exemple de notifications (plus tard tu pourras les récupérer depuis MongoDB)
  const notifications = [
    { id: 1, type: "comment", message: "Nouveau commentaire sur ton article 🚀" },
    { id: 2, type: "follower", message: "Tu as un nouvel abonné 🎉" },
    { id: 3, type: "like", message: "Quelqu’un a aimé ton article ❤️" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul className="space-y-3">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className="p-4 bg-white shadow rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            {notif.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
