import { useState } from "react";
import { TextField, Box, Button } from "@mui/material";

const notificationsData = [
  {
    id: 1,
    title: "Notification Title 1",
    description: "This is the description for notification 1.",
    date: "2024-08-12",
    isUnread: true,
  },
  {
    id: 2,
    title: "Notification Title 2",
    description: "This is the description for notification 2.",
    date: "2024-09-14",
    isUnread: false,
  },
  {
    id: 3,
    title: "Notification Title 3",
    description: "This is the description for notification 3.",
    date: "2024-10-10",
    isUnread: true,
  },
  // Add more notifications as needed
];

const Notifications = () => {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [filteredNotifications, setFilteredNotifications] =
    useState(notificationsData);

  const handleDateChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value,
    });
  };

  const filterNotifications = () => {
    if (dateRange.startDate && dateRange.endDate) {
      const filtered = notificationsData.filter((notification) => {
        const notificationDate = new Date(notification.date);
        return (
          notificationDate >= new Date(dateRange.startDate) &&
          notificationDate <= new Date(dateRange.endDate)
        );
      });
      setFilteredNotifications(filtered);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Notifications ({filteredNotifications.length})
      </h2>

      {/* Custom Date Range Picker */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <TextField
          name="startDate"
          label="From"
          type="date"
          value={dateRange.startDate}
          onChange={handleDateChange}
          InputLabelProps={{ shrink: true }}
          size="small"
          sx={{ width: 150, mr: 1 }}
        />
        <TextField
          name="endDate"
          label="To"
          type="date"
          value={dateRange.endDate}
          onChange={handleDateChange}
          InputLabelProps={{ shrink: true }}
          size="small"
          sx={{ width: 150 }}
        />
        <Button
          onClick={filterNotifications}
          variant="contained"
          sx={{ ml: 2, backgroundColor: "black", color: "white" }}
        >
          Filter
        </Button>
      </Box>

      {/* Notification List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex justify-between p-4 rounded-lg ${
              notification.isUnread ? "bg-gray-100" : ""
            }`}
          >
            <div>
              <h3 className="font-semibold">
                {notification.title}{" "}
                {notification.isUnread && (
                  <span className="text-red-500">&#x2022;</span>
                )}
              </h3>
              <p className="text-sm text-gray-600">
                {notification.description}
              </p>
            </div>
            <span className="text-sm text-gray-500">{notification.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
