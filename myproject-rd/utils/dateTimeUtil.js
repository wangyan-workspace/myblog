module.exports = {
    formatTime(timestamp, fmt) {
        let time = new SimpleDateFormat("yyyy-MM-dd");
        let postTime = time.format(timestamp)
        return postTime
    }

}