export const handler = async (event) => {
    try {
        const alarmData = event.alarmData;
        const alarmName = alarmData.alarmName;
        const currentReason = alarmData.state.reason;
        const instanceId =
            alarmData.configuration.metrics[0].metricStat.metric.dimensions
                .InstanceId;
        const metricName =
            alarmData.configuration.metrics[0].metricStat.metric.name;
        const currentValue = alarmData.state.reasonData
            ? JSON.parse(alarmData.state.reasonData).recentDatapoints[0]
            : null;
        const threshold = alarmData.state.reasonData
            ? JSON.parse(alarmData.state.reasonData).threshold
            : null;

        let message = `AWS CloudWatch Alarm Triggered:
  **Alarm Name: ${alarmName}**
  
  Reason: ${currentReason}
  
  Instance ID: ${instanceId}
  Metric Name: ${metricName}  
  Current Value: ${currentValue}  
  Threshold: ${threshold}`;

        const webhookUrl = "my webhook url";

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: message }),
        });

        if (!response.ok) {
            throw new Error(`Could not send message: ${response.status}`);
        }

        console.log("Message sent successfully");
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Notification sent successfully" }),
        };
    } catch (error) {
        console.error("Error sending message:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
