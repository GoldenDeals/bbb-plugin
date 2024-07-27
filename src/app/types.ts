interface SampleFloatingWindowPluginProps {
    pluginName: string,
    pluginUuid: string,
}

export { SampleFloatingWindowPluginProps };

interface SampleUiEventsPluginProps {
    pluginName: string,
    pluginUuid: string,
}

export { SampleUiEventsPluginProps };

export interface LessonI {
    id: string;
    sub_token: string;
    type_id: string;

    amount: number;

    active: boolean;
    chat_id: string;
    chat_token: string;
    suspend_message: string;
    attachment: FileI[];
    grade_id: string;
    subject_id: string;
    name: string;
    paused: boolean;
    paused_by_end: boolean;
    last_pause: number;
    percent: number;
    planned: number;
    price: number;
    student_confirmed: boolean;
    teacher_amount: number;
    teacher_confirmed: boolean;
    time_ended: number;
    time_erased: number;
    time_started: number;
    expected_time: number;
    total_time: number;

    updated_at: string;
    created_at: string;
}

export interface FileI {
    base64: string;
    fileName: string;
    fileSize: string;
    fileType: string;
}
