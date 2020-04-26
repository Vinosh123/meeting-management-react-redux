export function addMeetingEvent(meetingData) {
    return {
        type: "INSERTING_MEETING_DATA",
        meetingData
    }
}

export function editData(edit, date) {
    return {
        type: "UPDATING_MEETING_DATA",
        editingInfo: { edit, date },
    }
}
