import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ReactComponent as AddEventIcon, ReactComponent as Event2Icon } from './icons/event2.svg';
import { ReactComponent as AddressIcon } from './icons/adress.svg';
import { ReactComponent as AidsIcon } from './icons/aids.svg';
import { ReactComponent as AlarmIcon } from './icons/alarm.svg';
import { ReactComponent as ApprovedIcon } from './icons/approved.svg';
import { ReactComponent as AttentionIcon } from './icons/attention.svg';
import { ReactComponent as BackIcon } from './icons/back.svg';
import { ReactComponent as BedIcon } from './icons/bed.svg';
import { ReactComponent as BloodDropIcon } from './icons/blood-drop.svg';
import { ReactComponent as BloodDropOIcon } from './icons/blood-drop-o.svg';
import { ReactComponent as BookIcon } from './icons/book.svg';
import { ReactComponent as BookOIcon } from './icons/book-o.svg';
import { ReactComponent as BookmarkIcon } from './icons/bookmark.svg';
import { ReactComponent as BookmarkCalendarIcon } from './icons/bookmark-calendar.svg';
import { ReactComponent as BookmarkClockIcon } from './icons/bookmark-clock.svg';
import { ReactComponent as BookmarkClockOIcon } from './icons/bookmark-clock-o.svg';
import { ReactComponent as BookmarkEndIcon } from './icons/bookmark-end.svg';
import { ReactComponent as BookmarkOkIcon } from './icons/bookmark-ok.svg';
import { ReactComponent as BookmarkPlusIcon } from './icons/bookmark-plus.svg';
import { ReactComponent as BookmarkRemoveIcon } from './icons/bookmark-remove.svg';
import { ReactComponent as BookmarkUndoIcon } from './icons/bookmark-undo.svg';
import { ReactComponent as BriefCaseIcon } from './icons/briefcase.svg';
import { ReactComponent as BuildingOIcon } from './icons/building-o.svg';
import { ReactComponent as CalendarIcon } from './icons/calendar.svg';
import { ReactComponent as CalendarPlusIcon } from './icons/calendar-plus.svg';
import { ReactComponent as CalendarPlusCircleIcon } from './icons/calendar-plus-circle.svg';
import { ReactComponent as CallIcon } from './icons/call.svg';
import { ReactComponent as CallEndIcon } from './icons/callend.svg';
import { ReactComponent as CameraIcon } from './icons/camera.svg';
import { ReactComponent as Camera2Icon } from './icons/camera2.svg';
import { ReactComponent as CameraOffIcon } from './icons/cameraoff.svg';
import { ReactComponent as ChatIcon } from './icons/chat.svg';
import { ReactComponent as ChatOIcon } from './icons/chat-o.svg';
import { ReactComponent as ChevronCircleDownIcon } from './icons/chevron-circle-down.svg';
import { ReactComponent as ChevronCircleLeftIcon } from './icons/chevron-circle-left.svg';
import { ReactComponent as ChevronCircleLeftOIcon } from './icons/chevron-circle-left-o.svg';
import { ReactComponent as ChevronCircleRightIcon } from './icons/chevron-circle-right.svg';
import { ReactComponent as ChevronCircleRightOIcon } from './icons/chevron-circle-right-o.svg';
import { ReactComponent as ChevronCircleUndoOIcon } from './icons/chevron-circle-undo-o.svg';
import { ReactComponent as ChevronCircleUpIcon } from './icons/chevron-circle-up.svg';
import { ReactComponent as ChevronDownIcon } from './icons/chevron-down.svg';
import { ReactComponent as ChevronDownOIcon } from './icons/chevron-down-o.svg';
import { ReactComponent as ChevronDownUpIcon } from './icons/chevron-down-up.svg';
import { ReactComponent as ChevronLeftCopyIcon } from './icons/chevron-left-copy.svg';
import { ReactComponent as ChevronRightIcon } from './icons/chevron-right.svg';
import { ReactComponent as ChevronUpIcon } from './icons/chevron-up.svg';
import { ReactComponent as ChevronUpOIcon } from './icons/chevron-up-o.svg';
import { ReactComponent as CircleIcon } from './icons/circle.svg';
import { ReactComponent as ClinicOIcon } from './icons/clinic-o.svg';
import { ReactComponent as ClockIcon } from './icons/clock.svg';
import { ReactComponent as ClockCircleIcon } from './icons/clock-circle.svg';
import { ReactComponent as ClockDownIcon } from './icons/clock-down.svg';
import { ReactComponent as ClockOIcon } from './icons/clock-o.svg';
import { ReactComponent as ClockOffIcon } from './icons/clock-off.svg';
import { ReactComponent as ClockUpIcon } from './icons/clock-up.svg';
import { ReactComponent as CloseUpIcon } from './icons/close-up.svg';
import { ReactComponent as CloudIcon } from './icons/cloud.svg';
import { ReactComponent as ConflictIcon } from './icons/conflict.svg';
import { ReactComponent as CopyIcon } from './icons/copy.svg';
import { ReactComponent as CopyOIcon } from './icons/copy-o.svg';
import { ReactComponent as CriticalIcon } from './icons/critical.svg';
import { ReactComponent as DashboardIcon } from './icons/dashboard.svg';
import { ReactComponent as DeleteEventIcon, ReactComponent as Event1Icon } from './icons/event1.svg';
import { ReactComponent as DisabilityIcon } from './icons/disability.svg';
import { ReactComponent as DocIcon } from './icons/doc.svg';
import { ReactComponent as DocOIcon } from './icons/doc-o.svg';
import { ReactComponent as DocDocIcon } from './icons/docdoc.svg';
import { ReactComponent as DollarIcon } from './icons/dollar.svg';
import { ReactComponent as DollarOIcon } from './icons/dollar-o.svg';
import { ReactComponent as DownloadIcon } from './icons/download.svg';
import { ReactComponent as DragAndDropIcon } from './icons/drag_drop.svg';
import { ReactComponent as DropCounterIcon } from './icons/drop-counter.svg';
import { ReactComponent as DrugsIcon } from './icons/drugs.svg';
import { ReactComponent as ENIcon } from './icons/EN.svg';
import { ReactComponent as EndIcon } from './icons/end.svg';
import { ReactComponent as EnvelopeIcon } from './icons/envelope.svg';

import { ReactComponent as Event3Icon } from './icons/event3.svg';
import { ReactComponent as Event4Icon } from './icons/event4.svg';
import { ReactComponent as Event5Icon } from './icons/event5.svg';
import { ReactComponent as ExpandIcon } from './icons/expand.svg';
import { ReactComponent as ExpandOIcon } from './icons/expand-o.svg';
import { ReactComponent as ExperimentResultsOIcon } from './icons/experiment-results-o.svg';
import { ReactComponent as EyeHideIcon } from './icons/eye-hide.svg';
import { ReactComponent as EyeOIcon } from './icons/eye-o.svg';
import { ReactComponent as FarmIcon } from './icons/farm.svg';
import { ReactComponent as FemaleIcon } from './icons/female.svg';
import { ReactComponent as FileOIcon } from './icons/file-o.svg';
import { ReactComponent as FileTextOIcon } from './icons/file-text-o.svg';
import { ReactComponent as FileMinIcon } from './icons/filemin.svg';
import { ReactComponent as FilePlusIcon } from './icons/fileplus.svg';
import { ReactComponent as FirstAidKitIcon } from './icons/first-aid-kit.svg';
import { ReactComponent as FirstAidKitOIcon } from './icons/first-aid-kit-o.svg';
import { ReactComponent as FirstAidOIcon } from './icons/first-aid-o.svg';
import { ReactComponent as FlaskIcon } from './icons/flask.svg';
import { ReactComponent as FlaskOIcon } from './icons/flask-o.svg';
import { ReactComponent as FolderIcon } from './icons/folder.svg';
import { ReactComponent as FolderOIcon } from './icons/folder-o.svg';
import { ReactComponent as FoursquareIcon } from './icons/foursquare.svg';
import { ReactComponent as FunnelIcon } from './icons/funnel.svg';
import { ReactComponent as GalleryIcon } from './icons/gallery.svg';
import { ReactComponent as GlyphiconBookIcon } from './icons/glyphicon-book.svg';
import { ReactComponent as GlyphiconListAltIcon } from './icons/glyphicon-list-alt.svg';
import { ReactComponent as GlyphiconOkIcon } from './icons/glyphicon-ok.svg';
import { ReactComponent as GlyphiconOkOIcon } from './icons/glyphicon-ok-o.svg';
import { ReactComponent as GlyphiconOkFillIcon } from './icons/glyphicon-ok-fill.svg';
import { ReactComponent as GlyphiconRemoveIcon } from './icons/glyphicon-remove.svg';
import { ReactComponent as GlyphiconRemoveOIcon } from './icons/glyphicon-remove-o.svg';
import { ReactComponent as GrivnaIcon } from './icons/grivna.svg';
import { ReactComponent as GroupIcon } from './icons/group.svg';
import { ReactComponent as GroupOIcon } from './icons/group-o.svg';
import { ReactComponent as HandIcon } from './icons/hand.svg';
import { ReactComponent as HandOIcon } from './icons/hand-o.svg';
import { ReactComponent as HeartIcon } from './icons/heart.svg';
import { ReactComponent as HeartOIcon } from './icons/heart-o.svg';
import { ReactComponent as HistoryIcon } from './icons/history.svg';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { ReactComponent as HospitalIcon } from './icons/hospital.svg';
import { ReactComponent as HospitalOIcon } from './icons/hospital-o.svg';
import { ReactComponent as HourglassIcon } from './icons/hourglass.svg';
import { ReactComponent as IndentIcon } from './icons/indent.svg';
import { ReactComponent as IndentOIcon } from './icons/indent-o.svg';
import { ReactComponent as InfoIcon } from './icons/info.svg';
import { ReactComponent as InfoCircleIcon } from './icons/info-circle.svg';
import { ReactComponent as InjectionIcon } from './icons/injection.svg';
import { ReactComponent as EventsIcon } from './icons/ivents.svg';
import { ReactComponent as KebabIcon } from './icons/kebab.svg';
import { ReactComponent as KeyIcon } from './icons/key.svg';
import { ReactComponent as KeyOIcon } from './icons/key-o.svg';
import { ReactComponent as LaboratoryIcon } from './icons/laboratory.svg';
import { ReactComponent as LayoutIcon } from './icons/layout.svg';
import { ReactComponent as LinkIcon } from './icons/link.svg';
import { ReactComponent as ListDiagnosesIcon } from './icons/list-diagnoses.svg';
import { ReactComponent as ListDiseaseOIcon } from './icons/list-disease-o.svg';
import { ReactComponent as ListServiceOIcon } from './icons/list-services-o.svg';
import { ReactComponent as ListUseOIcon } from './icons/list-use-o.svg';
import { ReactComponent as ListVisitsOIcon } from './icons/list-visits-o.svg';
import { ReactComponent as LoadingIcon } from './icons/loading.svg';
import { ReactComponent as LockIcon } from './icons/lock.svg';
import { ReactComponent as LoginIcon } from './icons/login.svg';
import { ReactComponent as MaleIcon } from './icons/male.svg';
import { ReactComponent as MdIcon } from './icons/md.svg';
import { ReactComponent as MdChatIcon } from './icons/mdchat.svg';
import { ReactComponent as MedalIcon } from './icons/medal.svg';
import { ReactComponent as MedicalComputerIcon } from './icons/medical-computer.svg';
import { ReactComponent as MedicalRecordsIcon } from './icons/medical-records.svg';
import { ReactComponent as MedicalTagsIcon } from './icons/medical-tags.svg';
import { ReactComponent as MedicalRecordOIcon } from './icons/medicalrecord-o.svg';
import { ReactComponent as MedicineDrugsIcon } from './icons/medicine-drugs.svg';
import { ReactComponent as MedicinesOIcon } from './icons/medicines-o.svg';
import { ReactComponent as MedListIcon } from './icons/medlist.svg';
import { ReactComponent as MegaphoneIcon } from './icons/megaphone.svg';
import { ReactComponent as MenuIcon } from './icons/menu.svg';
import { ReactComponent as MicrophoneIcon } from './icons/microphone.svg';
import { ReactComponent as MicrophoneOffIcon } from './icons/microphoneoff.svg';
import { ReactComponent as MicroscopeOIcon } from './icons/microscope-o.svg';
import { ReactComponent as MinusIcon } from './icons/minus.svg';
import { ReactComponent as MoonIcon } from './icons/moon.svg';
import { ReactComponent as MoonOIcon } from './icons/moon-o.svg';
import { ReactComponent as MoonSunIcon } from './icons/moon-sun.svg';
import { ReactComponent as MoveIcon } from './icons/move.svg';
import { ReactComponent as NavigationIcon } from './icons/navigation.svg';
import { ReactComponent as Nczu1Icon } from './icons/nczu1.svg';
import { ReactComponent as Nczu2Icon } from './icons/nczu2.svg';
import { ReactComponent as OfficeIcon } from './icons/office.svg';
import { ReactComponent as OperatorKyivstarIcon } from './icons/operator-kyivstar.svg';
import { ReactComponent as OperatorLifecellIcon } from './icons/operator-lifecell.svg';
import { ReactComponent as OperatorLocalIcon } from './icons/operator-local.svg';
import { ReactComponent as OperatorVodafoneIcon } from './icons/operator-vodafone.svg';
import { ReactComponent as OrganizationIcon } from './icons/organization.svg';
import { ReactComponent as PaperclipIcon } from './icons/paperclip.svg';
import { ReactComponent as PauseIcon } from './icons/pause.svg';
import { ReactComponent as PdfIcon } from './icons/pdf.svg';
import { ReactComponent as PencilIcon } from './icons/pencil.svg';
import { ReactComponent as PencilOIcon } from './icons/pencil-o.svg';
import { ReactComponent as PhoneIcon } from './icons/phone.svg';
import { ReactComponent as PictureIcon } from './icons/picture.svg';
import { ReactComponent as PlaceholderIcon } from './icons/placeholder.svg';
import { ReactComponent as PlayIcon } from './icons/play.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as PlusOIcon } from './icons/plus-o.svg';
import { ReactComponent as PointsIcon } from './icons/points.svg';
import { ReactComponent as PrintIcon } from './icons/print.svg';
import { ReactComponent as ProfilIcon } from './icons/profil.svg';
import { ReactComponent as ProfilOIcon } from './icons/profil-o.svg';
import { ReactComponent as PsychologyIcon } from './icons/psychology.svg';
import { ReactComponent as PulseIcon } from './icons/pulse-o.svg';
import { ReactComponent as PushPinIcon } from './icons/push-pin.svg';
import { ReactComponent as PushPinSelectedIcon } from './icons/push-pin-selected.svg';
import { ReactComponent as QuestionIcon } from './icons/question.svg';
import { ReactComponent as QuestionCircleIcon } from './icons/question-circle.svg';
import { ReactComponent as QuestionCircleOIcon } from './icons/question-circle-o.svg';
import { ReactComponent as RefreshIcon } from './icons/refresh.svg';
import { ReactComponent as ReplaceIcon } from './icons/replace.svg';
import { ReactComponent as RUIcon } from './icons/RU.svg';
import { ReactComponent as RubbishIcon } from './icons/rubbish.svg';
import { ReactComponent as SaveIcon } from './icons/save.svg';
import { ReactComponent as SearchIcon } from './icons/search.svg';
import { ReactComponent as SendIcon } from './icons/send.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';
import { ReactComponent as SettingsOIcon } from './icons/settings-o.svg';
import { ReactComponent as SignInIcon } from './icons/sign-in.svg';
import { ReactComponent as StarIcon } from './icons/star.svg';
import { ReactComponent as StarOIcon } from './icons/star-o.svg';
import { ReactComponent as StethoscopeIcon } from './icons/stethoscope.svg';
import { ReactComponent as StopIcon } from './icons/stop.svg';
import { ReactComponent as SunIcon } from './icons/sun.svg';
import { ReactComponent as SunOIcon } from './icons/sun-o.svg';
import { ReactComponent as TableIcon } from './icons/table.svg';
import { ReactComponent as TagIcon } from './icons/tag.svg';
import { ReactComponent as TranslationIcon } from './icons/translation.svg';
import { ReactComponent as TrigonIcon } from './icons/trigon.svg';
import { ReactComponent as UAIcon } from './icons/UA.svg';
import { ReactComponent as UndoIcon } from './icons/undo.svg';
import { ReactComponent as UnlinkIcon } from './icons/unlink.svg';
import { ReactComponent as UploadIcon } from './icons/upload.svg';
import { ReactComponent as UserIcon } from './icons/user.svg';
import { ReactComponent as UserMdIcon } from './icons/user-md.svg';
import { ReactComponent as UserOIcon } from './icons/user-o.svg';
import { ReactComponent as UsersIcon } from './icons/users.svg';
import { ReactComponent as UsersOIcon } from './icons/users-o.svg';
import { ReactComponent as VideoCameraIcon } from './icons/video-camera.svg';
import { ReactComponent as VisitsIcon } from './icons/visits.svg';
import { ReactComponent as WarningIcon } from './icons/warning.svg';
import { ReactComponent as WheelchairIcon } from './icons/wheelchair.svg';
import { ReactComponent as XRaysOIcon } from './icons/x-rays-o.svg';
import { ReactComponent as Vacctination } from './icons/vaccination.svg';
import { ReactComponent as SickLeave } from './icons/sick-leave.svg';
import { ReactComponent as MedicalSister } from './icons/medical-sister.svg';
import { ReactComponent as IconWarningFill } from './icons/icon-warning-fill.svg';



import './style.scss';

const { oneOf, string, func, bool, shape } = PropTypes;

export const TYPES = {
    attention: 'attention',
    success: 'glyphicon-ok',
    successWhite: 'glyphicon-ok',
    fail: 'fail',
    warning: 'warning',
    warningFill: 'warningFill',
    end: 'end',
    update: 'update',
    info: 'info-circle',
    edit: 'edit',
    copy: 'copy',
    copyO: 'copy-o',
    clock: 'clock',
    clockOff: 'clock-off',
    question: 'question-circle',
    chevronRight: 'chevron-circle-right-o',
    ok: 'glyphicon-ok-o',
    okRound: 'glyphicon-ok',
    okRoundFill: 'glyphicon-ok-fill',
    male: 'male',
    female: 'female',
    remove: 'glyphicon-remove',
    addEvent: 'event2',
    deleteEvent: 'event1',
    hourglass: 'hourglass',
    loading: 'loading',
    replace: 'replace',
    download: 'download',
    pause: 'pause',
    home: 'home',
    attachFile: 'paperclip',
    plus: 'plus',
    plusCircle: 'plus-o',
    calendarCircle: 'calendar-plus-circle',
    arrowLeft: 'chevron-circle-left-o',
    arrowRight: 'chevron-circle-right-o',
    save: 'save',
    grivna: 'grivna',
    listVisits: 'list-visits-o',
    template: 'list-use-o',
    doctor: 'md',
    uploadFile: 'upload',
    refresh: 'refresh',
    envelope: 'envelope',
    send: 'send',
    circle: 'circle',
    foursquare: 'foursquare',
    trigon: 'trigon',
    trigonCritical: 'critical',
    kebab: 'kebab',
    pencil: 'pencil-o',
    calendar: 'calendar',
    phone: 'phone',
    nczu1: 'nczu1',
    nczu2: 'nczu2',
    heart: 'heart',
    close: 'close',
    medicalRecords: 'medical-records',
    chevronUp: 'chevron-up',
    chevronDown: 'chevron-down',
    calendarPlusCircle: 'calendar-plus-circle',
    listServicesO: 'list-services-o',
    listVisitsO: 'list-visits-o',
    psychology: 'psychology',
    flask: 'flask',
    vaccination: 'vaccination',
    sickLeave: 'sick-leave',
    medicalSister: 'medical-sister',
    clockCircle: 'clock-circle',
    videoCamera: 'video-camera',
    camera2: 'camera2',
    move: 'move',
};

const ICON = {
    aids: AidsIcon,
    addEvent: AddEventIcon,
    address: AddressIcon,
    alarm: AlarmIcon,
    approved: ApprovedIcon,
    attention: AttentionIcon,
    arrowLeft: ChevronCircleLeftOIcon,
    arrowRight: ChevronCircleRightOIcon,
    back: BackIcon,
    bed: BedIcon,
    'blood-drop': BloodDropIcon,
    'blood-drop-o': BloodDropOIcon,
    book: BookIcon,
    'book-o': BookOIcon,
    bookmark: BookmarkIcon,
    'bookmark-calendar': BookmarkCalendarIcon,
    'bookmark-clock': BookmarkClockIcon,
    'bookmark-clock-o': BookmarkClockOIcon,
    'bookmark-end': BookmarkEndIcon,
    'bookmark-ok': BookmarkOkIcon,
    'bookmark-plus': BookmarkPlusIcon,
    'bookmark-remove': BookmarkRemoveIcon,
    'bookmark-undo': BookmarkUndoIcon,
    briefcase: BriefCaseIcon,
    'building-o': BuildingOIcon,
    calendar: CalendarIcon,
    calendarCircle: CalendarPlusCircleIcon,
    'calendar-plus': CalendarPlusIcon,
    'calendar-plus-circle': CalendarPlusCircleIcon,
    call: CallIcon,
    callend: CallEndIcon,
    camera: CameraIcon,
    camera2: Camera2Icon,
    cameraoff: CameraOffIcon,
    chat: ChatIcon,
    'chat-o': ChatOIcon,
    'chevron-circle-down': ChevronCircleDownIcon,
    'chevron-circle-left': ChevronCircleLeftIcon,
    'chevron-circle-left-o': ChevronCircleLeftOIcon,
    'chevron-circle-right': ChevronCircleRightIcon,
    'chevron-circle-right-o': ChevronCircleRightOIcon,
    'chevron-circle-undo-o': ChevronCircleUndoOIcon,
    'chevron-circle-up': ChevronCircleUpIcon,
    'chevron-down': ChevronDownIcon,
    'chevron-down-o': ChevronDownOIcon,
    'chevron-down-up': ChevronDownUpIcon,
    'chevron-left-copy': ChevronLeftCopyIcon,
    'chevron-right': ChevronRightIcon,
    'chevron-up': ChevronUpIcon,
    'chevron-up-o': ChevronUpOIcon,
    circle: CircleIcon,
    'clinic-o': ClinicOIcon,
    clock: ClockIcon,
    'clock-circle': ClockCircleIcon,
    'clock-down': ClockDownIcon,
    'clock-o': ClockOIcon,
    'clock-off': ClockOffIcon,
    'clock-up': ClockUpIcon,
    'close-up': CloseUpIcon,
    cloud: CloudIcon,
    conflict: ConflictIcon,
    copy: CopyIcon,
    'copy-o': CopyOIcon,
    critical: CriticalIcon,
    trigonCritical: CriticalIcon,
    dashboard: DashboardIcon,
    deleteEvent: DeleteEventIcon,
    disability: DisabilityIcon,
    doc: DocIcon,
    'doc-o': DocOIcon,
    docdoc: DocDocIcon,
    dollar: DollarIcon,
    'dollar-o': DollarOIcon,
    download: DownloadIcon,
    'drag&drop': DragAndDropIcon,
    'drop-counter': DropCounterIcon,
    drugs: DrugsIcon,
    edit: PencilIcon,
    EN: ENIcon,
    end: EndIcon,
    envelope: EnvelopeIcon,
    event1: Event1Icon,
    event2: Event2Icon,
    event3: Event3Icon,
    event4: Event4Icon,
    event5: Event5Icon,
    expand: ExpandIcon,
    'expand-o': ExpandOIcon,
    'experiment-results-o': ExperimentResultsOIcon,
    'eye-hide': EyeHideIcon,
    'eye-o': EyeOIcon,
    farm: FarmIcon,
    fail: EndIcon,
    female: FemaleIcon,
    'file-o': FileOIcon,
    'file-text-o': FileTextOIcon,
    filemin: FileMinIcon,
    fileplus: FilePlusIcon,
    'first-aid-kit': FirstAidKitIcon,
    'first-aid-kit-o': FirstAidKitOIcon,
    'first-aid-o': FirstAidOIcon,
    flask: FlaskIcon,
    'flask-o': FlaskOIcon,
    folder: FolderIcon,
    'folder-o': FolderOIcon,
    foursquare: FoursquareIcon,
    funnel: FunnelIcon,
    gallery: GalleryIcon,
    'glyphicon-book': GlyphiconBookIcon,
    'glyphicon-list-alt': GlyphiconListAltIcon,
    'glyphicon-ok': GlyphiconOkIcon,
    successWhite: GlyphiconOkIcon,
    okRound: GlyphiconOkIcon,
    'glyphicon-ok-o': GlyphiconOkOIcon,
    'glyphicon-ok-fill': GlyphiconOkFillIcon,
    ok: GlyphiconOkOIcon,
    times: GlyphiconRemoveIcon,
    'glyphicon-remove': GlyphiconRemoveIcon,
    'glyphicon-remove-o': GlyphiconRemoveOIcon,
    grivna: GrivnaIcon,
    group: GroupIcon,
    'group-o': GroupOIcon,
    hand: HandIcon,
    'hand-o': HandOIcon,
    heart: HeartIcon,
    'heart-o': HeartOIcon,
    history: HistoryIcon,
    home: HomeIcon,
    hospital: HospitalIcon,
    'hospital-o': HospitalOIcon,
    hourglass: HourglassIcon,
    indent: IndentIcon,
    'indent-o': IndentOIcon,
    info: InfoCircleIcon,
    'info-circle': InfoCircleIcon,
    injection: InjectionIcon,
    ivents: EventsIcon,
    kebab: KebabIcon,
    key: KeyIcon,
    'key-o': KeyOIcon,
    laboratory: LaboratoryIcon,
    layout: LayoutIcon,
    link: LinkIcon,
    'list-diagnoses': ListDiagnosesIcon,
    'list-disease-o': ListDiseaseOIcon,
    'list-services-o': ListServiceOIcon,
    'list-use-o': ListUseOIcon,
    'list-visits-o': ListVisitsOIcon,
    listVisits: ListVisitsOIcon,
    loading: LoadingIcon,
    lock: LockIcon,
    login: LoginIcon,
    male: MaleIcon,
    md: MdIcon,
    mdchat: MdChatIcon,
    medal: MedalIcon,
    'medical-computer': MedicalComputerIcon,
    'medical-records': MedicalRecordsIcon,
    'medical-tags': MedicalTagsIcon,
    'medicalrecord-o': MedicalRecordOIcon,
    'medicine-drugs': MedicineDrugsIcon,
    'medicines-o': MedicinesOIcon,
    medlist: MedListIcon,
    megaphone: MegaphoneIcon,
    menu: MenuIcon,
    microphone: MicrophoneIcon,
    microphoneoff: MicrophoneOffIcon,
    'microscope-o': MicroscopeOIcon,
    minus: MinusIcon,
    moon: MoonIcon,
    'moon-o': MoonOIcon,
    'moon-sun': MoonSunIcon,
    move: MoveIcon,
    navigation: NavigationIcon,
    nczu1: Nczu1Icon,
    nczu2: Nczu2Icon,
    office: OfficeIcon,
    'operator-kyivstar': OperatorKyivstarIcon,
    'operator-lifecell': OperatorLifecellIcon,
    'operator-local': OperatorLocalIcon,
    'operator-vodafone': OperatorVodafoneIcon,
    organization: OrganizationIcon,
    paperclip: PaperclipIcon,
    attachFile: PaperclipIcon,
    pause: PauseIcon,
    pdf: PdfIcon,
    pencil: PencilIcon,
    'pencil-o': PencilOIcon,
    phone: PhoneIcon,
    picture: PictureIcon,
    placeholder: PlaceholderIcon,
    play: PlayIcon,
    plus: PlusIcon,
    'plus-o': PlusOIcon,
    points: PointsIcon,
    print: PrintIcon,
    profil: ProfilIcon,
    'profil-o': ProfilOIcon,
    psychology: PsychologyIcon,
    'pulse-o': PulseIcon,
    'push-pin': PushPinIcon,
    'push-pin-selected': PushPinSelectedIcon,
    question: QuestionCircleIcon,
    'question-circle': QuestionCircleIcon,
    'question-circle-o': QuestionCircleOIcon,
    refresh: RefreshIcon,
    replace: ReplaceIcon,
    RU: RUIcon,
    rubbish: RubbishIcon,
    save: SaveIcon,
    search: SearchIcon,
    send: SendIcon,
    settings: SettingsIcon,
    'settings-o': SettingsOIcon,
    'sign-in': SignInIcon,
    star: StarIcon,
    'star-o': StarOIcon,
    stethoscope: StethoscopeIcon,
    stop: StopIcon,
    success: GlyphiconOkIcon,
    sun: SunIcon,
    'sun-o': SunOIcon,
    table: TableIcon,
    tag: TagIcon,
    translation: TranslationIcon,
    trigon: TrigonIcon,
    UA: UAIcon,
    undo: UndoIcon,
    unlink: UnlinkIcon,
    update: UndoIcon,
    upload: UploadIcon,
    user: UserIcon,
    'user-md': UserMdIcon,
    'user-o': UserOIcon,
    users: UsersIcon,
    'users-o': UsersOIcon,
    'video-camera': VideoCameraIcon,
    visits: VisitsIcon,
    warning: WarningIcon,
    warningFill: IconWarningFill,
    wheelchair: WheelchairIcon,
    'x-rays-o': XRaysOIcon,
    vaccination: Vacctination,
    'sick-leave': SickLeave,
    'medical-sister': MedicalSister,
};

export const ICON_NAME = TYPES;

export const SIZE = {
    xs: 'xs',
    sm: 'sm',
    lg: 'lg',
    '1x': '1x',
    '2x': '2x',
    '3x': '3x',
    '10x': '10x',
};

export const propTypes = {
    onClick: func,
    name: string,
    size: oneOf(['xs', 'sm', 'lg', '1x', '2x', '3x', '10x']),
    title: string,
    color: string,
    className: string,
    removeOffset: bool,
    style: shape({}),
};

export const defaultProps = {
    onClick: null,
    title: undefined,
    size: undefined,
    color: undefined,
    className: '',
    name: '',
    removeOffset: false,
    style: {},
};

const Icon = ({
    title,
    size,
    color,
    className,
    name,
    onClick,
    removeOffset,
    style,
    ...rest
}) => {
    if (!ICON[name] || typeof name !== 'string') return null;

    const Component = ICON[name];

    return (
        <span
            {...(title ? { title } : {})}
            className={classnames(
                'icon__svg',
                className,
                {
                    [`fa-${size}`]: size,
                    icon__svg_cursor: onClick,
                    removeOffset,
                },
            )}
            style={color ? { ...style, color } : style}
            onClick={onClick}
            {...rest}
            data-icon-name={name}
        >
            <Component />
        </span>
    );
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default memo(Icon);