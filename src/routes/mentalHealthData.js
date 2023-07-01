function mentalHealthData(req, res) {
    const username = req.query.username;
    console.log(username)
    const datapoints = [
        {
            date: "01-07-2023",
            m_health_score: 43,
        },
        {
            date: "02-07-2023",
            m_health_score: 34,
        },
        {
            date: "03-07-2023",
            m_health_score: 56,
        },
        {
            date: "04-07-2023",
            m_health_score: -20,
        },
        {
            date: "05-07-2023",
            m_health_score: -54,
        },
        {
            date: "06-07-2023",
            m_health_score: 3,
        },
        {
            date: "07-07-2023",
            m_health_score: 43,
        }
    ]
    res.send(datapoints)
}

module.exports = mentalHealthData