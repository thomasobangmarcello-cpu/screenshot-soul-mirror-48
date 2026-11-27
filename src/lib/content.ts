/**
 * All guidance copy for the site, in English and Kiswahili.
 * Nothing here is a listing, partner or statistic: those come only from verified records.
 */
import type { L } from "./i18n";

export const AREA_IDS = [
  "digital",
  "trades",
  "tailoring",
  "farming",
  "teaching",
  "care",
  "business",
  "creative",
  "community",
] as const;
export type AreaId = (typeof AREA_IDS)[number];

export type Area = { id: AreaId; name: L; strength: L; steps: L[] };

export const AREAS: Record<AreaId, Area> = {
  digital: {
    id: "digital",
    name: { en: "Digital & computer skills", sw: "Ujuzi wa kidijitali na kompyuta" },
    strength: {
      en: "You are comfortable with phones, computers or the internet. These skills can earn income from anywhere.",
      sw: "Unaweza kutumia simu, kompyuta au intaneti. Ujuzi huu unaweza kukuletea kipato ukiwa popote.",
    },
    steps: [
      { en: "Practise typing and organising files for 20 minutes a day.", sw: "Fanya mazoezi ya kuchapa na kupanga mafaili kwa dakika 20 kila siku." },
      { en: "Build one small real thing: a poster, a budget sheet or a simple web page.", sw: "Tengeneza kitu kimoja halisi: bango, jedwali la bajeti au ukurasa rahisi wa wavuti." },
      { en: "Offer to help a neighbour or local group with a digital task and ask for feedback.", sw: "Jitolee kumsaidia jirani au kikundi cha karibu kwa kazi ya kidijitali, kisha omba maoni." },
    ],
  },
  trades: {
    id: "trades",
    name: { en: "Building, repair & technical trades", sw: "Ujenzi, ukarabati na ufundi" },
    strength: {
      en: "You can make and fix things with your hands. Every community needs this every day.",
      sw: "Unaweza kutengeneza na kukarabati vitu kwa mikono yako. Kila jamii inahitaji ujuzi huu kila siku.",
    },
    steps: [
      { en: "Take photos of every job you finish — they are your proof of skill.", sw: "Piga picha za kila kazi unayomaliza — hizo ni ushahidi wa ujuzi wako." },
      { en: "Learn the safety basics of your trade before taking paid work.", sw: "Jifunze kanuni za usalama za fani yako kabla ya kuchukua kazi ya kulipwa." },
      { en: "Work beside an experienced fundi for a few weeks to learn pricing and customer care.", sw: "Fanya kazi pamoja na fundi mzoefu kwa wiki chache ili ujifunze kupanga bei na kuhudumia wateja." },
    ],
  },
  tailoring: {
    id: "tailoring",
    name: { en: "Tailoring, fashion & crafts", sw: "Ushonaji, mitindo na kazi za mikono" },
    strength: {
      en: "You can turn fabric and materials into things people want to buy.",
      sw: "Unaweza kugeuza vitambaa na malighafi kuwa bidhaa ambazo watu wanataka kununua.",
    },
    steps: [
      { en: "Make three sample items that show your best work.", sw: "Tengeneza sampuli tatu zinazoonyesha kazi yako bora." },
      { en: "Write down the cost of materials and your time for each item.", sw: "Andika gharama ya malighafi na muda wako kwa kila bidhaa." },
      { en: "Ask five people what they would pay and what they would change.", sw: "Waulize watu watano wangelipa kiasi gani na wangependa nini kibadilishwe." },
    ],
  },
  farming: {
    id: "farming",
    name: { en: "Farming, food & cooking", sw: "Kilimo, chakula na upishi" },
    strength: {
      en: "You know how to grow or prepare food — a need that never ends.",
      sw: "Unajua kulima au kuandaa chakula — hitaji lisiloisha.",
    },
    steps: [
      { en: "Start small: one kitchen-garden bed or one dish you make very well.", sw: "Anza kidogo: tuta moja la bustani ya nyumbani au chakula kimoja unachokipika vizuri sana." },
      { en: "Keep a simple record of what you spend and what you sell each week.", sw: "Weka kumbukumbu rahisi ya unachotumia na unachouza kila wiki." },
      { en: "Learn safe food handling and water-saving methods.", sw: "Jifunze utunzaji salama wa chakula na mbinu za kuokoa maji." },
    ],
  },
  teaching: {
    id: "teaching",
    name: { en: "Teaching, languages & translation", sw: "Kufundisha, lugha na utafsiri" },
    strength: {
      en: "You can explain things and move between languages. That helps others learn and be heard.",
      sw: "Unaweza kueleza mambo na kutumia lugha zaidi ya moja. Hilo huwasaidia wengine kujifunza na kusikika.",
    },
    steps: [
      { en: "Tutor one learner for a month and note what improves.", sw: "Mfundishe mwanafunzi mmoja kwa mwezi mmoja na uandike kinachoboreka." },
      { en: "List the languages you speak, read and write, and your level in each.", sw: "Orodhesha lugha unazozungumza, kusoma na kuandika, na kiwango chako kwa kila moja." },
      { en: "Prepare one short lesson plan you can show to a school or learning centre.", sw: "Andaa mpango mmoja mfupi wa somo unaoweza kuuonyesha shuleni au kituo cha mafunzo." },
    ],
  },
  care: {
    id: "care",
    name: { en: "Health, care & wellbeing", sw: "Afya, malezi na ustawi" },
    strength: {
      en: "You notice when people need help and you stay calm. Care work depends on that.",
      sw: "Unatambua watu wanapohitaji msaada na unabaki mtulivu. Kazi za huduma hutegemea hilo.",
    },
    steps: [
      { en: "Learn basic first aid and hygiene from a trusted trainer.", sw: "Jifunze huduma ya kwanza na usafi kutoka kwa mkufunzi anayeaminika." },
      { en: "Volunteer with a community health or childcare activity.", sw: "Jitolee katika shughuli ya afya ya jamii au malezi ya watoto." },
      { en: "Never give medical advice beyond your training — know when to refer someone.", sw: "Usitoe ushauri wa kitabibu zaidi ya mafunzo yako — jua wakati wa kumpeleka mtu kwa mtaalamu." },
    ],
  },
  business: {
    id: "business",
    name: { en: "Business, selling & money", sw: "Biashara, uuzaji na fedha" },
    strength: {
      en: "You see what people need and how to supply it. That is the heart of business.",
      sw: "Unaona watu wanahitaji nini na jinsi ya kuwapatia. Huo ndio moyo wa biashara.",
    },
    steps: [
      { en: "Write down one problem near you that people would pay to solve.", sw: "Andika tatizo moja lililo karibu nawe ambalo watu wangelipa ili litatuliwe." },
      { en: "Test with a very small amount of stock before you invest more.", sw: "Jaribu kwa bidhaa chache sana kabla ya kuwekeza zaidi." },
      { en: "Keep business money apart from home money from day one.", sw: "Tenganisha pesa za biashara na pesa za nyumbani tangu siku ya kwanza." },
    ],
  },
  creative: {
    id: "creative",
    name: { en: "Art, media & design", sw: "Sanaa, vyombo vya habari na usanifu" },
    strength: {
      en: "You can tell stories with pictures, sound or design. Organisations and businesses need that.",
      sw: "Unaweza kusimulia hadithi kwa picha, sauti au usanifu. Mashirika na biashara zinahitaji hilo.",
    },
    steps: [
      { en: "Collect your ten best pieces in one place.", sw: "Kusanya kazi zako kumi bora mahali pamoja." },
      { en: "Make one piece for a real local business or event, even for free the first time.", sw: "Tengeneza kazi moja kwa biashara au tukio halisi la karibu, hata bila malipo mara ya kwanza." },
      { en: "Learn one free editing tool well instead of many a little.", sw: "Jifunze zana moja ya bure ya kuhariri vizuri badala ya nyingi kidogo kidogo." },
    ],
  },
  community: {
    id: "community",
    name: { en: "Community work & leadership", sw: "Kazi za jamii na uongozi" },
    strength: {
      en: "People trust you and you can bring them together. That is a real, valued skill.",
      sw: "Watu wanakuamini na unaweza kuwaleta pamoja. Huo ni ujuzi halisi unaothaminiwa.",
    },
    steps: [
      { en: "Write down the groups you have led or helped, and what changed.", sw: "Andika vikundi ulivyoongoza au kusaidia, na kilichobadilika." },
      { en: "Practise writing a one-page report of an activity.", sw: "Fanya mazoezi ya kuandika ripoti ya ukurasa mmoja kuhusu shughuli." },
      { en: "Ask a community leader if you can assist at the next meeting.", sw: "Muulize kiongozi wa jamii kama unaweza kusaidia katika mkutano ujao." },
    ],
  },
};

export const TALENT_IDS = ["communicate", "problem", "hands", "organise", "creative", "numbers", "caring", "languages"] as const;
export type TalentId = (typeof TALENT_IDS)[number];

export const TALENTS: Record<TalentId, L> = {
  communicate: { en: "Talking with and persuading people", sw: "Kuzungumza na kushawishi watu" },
  problem: { en: "Solving problems and fixing what is broken", sw: "Kutatua matatizo na kurekebisha kilichoharibika" },
  hands: { en: "Working with my hands", sw: "Kufanya kazi kwa mikono yangu" },
  organise: { en: "Organising people and events", sw: "Kupanga watu na matukio" },
  creative: { en: "Drawing, music, stories or design", sw: "Kuchora, muziki, hadithi au usanifu" },
  numbers: { en: "Numbers and keeping records", sw: "Hesabu na kuweka kumbukumbu" },
  caring: { en: "Caring for others", sw: "Kuwajali wengine" },
  languages: { en: "Speaking several languages", sw: "Kuzungumza lugha kadhaa" },
};

/** Which skill areas each natural talent supports. */
export const TALENT_AREAS: Record<TalentId, AreaId[]> = {
  communicate: ["teaching", "community", "business"],
  problem: ["digital", "trades"],
  hands: ["trades", "tailoring", "farming"],
  organise: ["community", "business"],
  creative: ["creative", "tailoring"],
  numbers: ["business", "digital"],
  caring: ["care", "teaching"],
  languages: ["teaching", "community"],
};

export type Option = { id: string; label: L };

export const EDUCATION_OPTIONS: Option[] = [
  { id: "none", label: { en: "I have not been to school", sw: "Sijawahi kwenda shule" } },
  { id: "primary", label: { en: "Primary school", sw: "Shule ya msingi" } },
  { id: "secondary", label: { en: "Secondary school", sw: "Shule ya sekondari" } },
  { id: "vocational", label: { en: "Vocational or technical training", sw: "Mafunzo ya ufundi stadi" } },
  { id: "diploma", label: { en: "College diploma or university degree", sw: "Stashahada au shahada ya chuo" } },
  { id: "selftaught", label: { en: "Mostly self-taught", sw: "Nimejifunza zaidi mwenyewe" } },
];

export const CERTIFICATE_OPTIONS: Option[] = [
  { id: "using", label: { en: "I have certificates and I use them in my work", sw: "Nina vyeti na ninavitumia kazini" } },
  { id: "unused", label: { en: "I have certificates but I am not using them yet", sw: "Nina vyeti lakini bado sivitumii" } },
  { id: "progress", label: { en: "I am studying for one now", sw: "Ninasomea cheti sasa" } },
  { id: "none", label: { en: "I have no certificates", sw: "Sina vyeti" } },
];

export const WORK_OPTIONS: Option[] = [
  { id: "none", label: { en: "I have not worked yet", sw: "Bado sijafanya kazi" } },
  { id: "volunteer", label: { en: "Volunteer or incentive work", sw: "Kazi ya kujitolea au ya posho" } },
  { id: "informal", label: { en: "Small jobs or helping in a family business", sw: "Vibarua au kusaidia biashara ya familia" } },
  { id: "employed", label: { en: "I have been employed", sw: "Nimewahi kuajiriwa" } },
  { id: "own", label: { en: "I run or have run my own business", sw: "Ninaendesha au nimewahi kuendesha biashara yangu" } },
];

export const GOAL_OPTIONS: Option[] = [
  { id: "job", label: { en: "Find a job", sw: "Kupata ajira" } },
  { id: "business", label: { en: "Start or grow a business", sw: "Kuanzisha au kukuza biashara" } },
  { id: "study", label: { en: "Continue my studies or training", sw: "Kuendelea na masomo au mafunzo" } },
  { id: "freelance", label: { en: "Earn from freelance or online work", sw: "Kupata kipato kwa kazi huru au za mtandaoni" } },
];

export const CERTIFICATE_ADVICE: Record<string, L> = {
  using: {
    en: "You are already using your certificate. Keep adding proof of results — what you did, for whom, and what changed.",
    sw: "Tayari unatumia cheti chako. Endelea kuongeza ushahidi wa matokeo — ulichofanya, kwa nani, na kilichobadilika.",
  },
  unused: {
    en: "Your certificate is the starting point, not the finish. This week, choose one activity that uses what you studied so you can show results, not only paper.",
    sw: "Cheti chako ni mwanzo, si mwisho. Wiki hii, chagua shughuli moja inayotumia ulichosoma ili uonyeshe matokeo, si karatasi tu.",
  },
  progress: {
    en: "While you study, start one small real project. You will finish with both a certificate and experience.",
    sw: "Unapoendelea kusoma, anza mradi mmoja mdogo halisi. Utamaliza ukiwa na cheti pamoja na uzoefu.",
  },
  none: {
    en: "No certificate does not mean no skills. Collect proof of what you can do — photos, finished work, references — in your portfolio.",
    sw: "Kukosa cheti hakumaanishi kukosa ujuzi. Kusanya ushahidi wa unachoweza kufanya — picha, kazi zilizokamilika, mapendekezo — kwenye jalada lako.",
  },
};

export type Activity = { id: string; area: AreaId; kind: "exercise" | "tutorial" | "project"; title: L; body: L };

export const ACTIVITIES: Activity[] = [
  { id: "digital-typing", area: "digital", kind: "exercise", title: { en: "Type one page without looking", sw: "Chapa ukurasa mmoja bila kuangalia" }, body: { en: "Copy a one-page text every day for a week. Time yourself and write down your speed. Aim to be a little faster each day.", sw: "Nakili maandishi ya ukurasa mmoja kila siku kwa wiki moja. Jipime muda na uandike kasi yako. Lenga kuongeza kasi kidogo kila siku." } },
  { id: "digital-budget", area: "digital", kind: "project", title: { en: "Build a household budget sheet", sw: "Tengeneza jedwali la bajeti ya nyumbani" }, body: { en: "Use a spreadsheet app to list income and spending for one month, with totals. Show it to someone and explain how it works.", sw: "Tumia programu ya jedwali kuorodhesha mapato na matumizi ya mwezi mmoja, pamoja na jumla. Mwonyeshe mtu na umweleze inavyofanya kazi." } },
  { id: "trades-toolkit", area: "trades", kind: "tutorial", title: { en: "Know your tools and their safe use", sw: "Jua zana zako na matumizi yake salama" }, body: { en: "List every tool your trade uses. For each one, write what it does and one safety rule. Ask an experienced fundi to check your list.", sw: "Orodhesha kila zana inayotumika katika fani yako. Kwa kila moja, andika kazi yake na kanuni moja ya usalama. Mwombe fundi mzoefu akague orodha yako." } },
  { id: "trades-repair", area: "trades", kind: "project", title: { en: "Complete and document one repair", sw: "Kamilisha na uandike ukarabati mmoja" }, body: { en: "Fix one real item — a chair, a radio, a door. Photograph it before and after, and note the time and materials used.", sw: "Karabati kitu kimoja halisi — kiti, redio, mlango. Piga picha kabla na baada, na uandike muda na vifaa vilivyotumika." } },
  { id: "tailoring-measure", area: "tailoring", kind: "exercise", title: { en: "Measure five people accurately", sw: "Pima watu watano kwa usahihi" }, body: { en: "Take full body measurements for five people and record them neatly. Measure each person twice and compare your numbers.", sw: "Chukua vipimo kamili vya watu watano na uviandike vizuri. Pima kila mtu mara mbili na ulinganishe namba zako." } },
  { id: "tailoring-sample", area: "tailoring", kind: "project", title: { en: "Sew one item from start to finish", sw: "Shona bidhaa moja kuanzia mwanzo hadi mwisho" }, body: { en: "Choose a simple item such as a bag or a child's dress. Cost the materials, sew it, and ask three people for honest feedback.", sw: "Chagua bidhaa rahisi kama mfuko au gauni la mtoto. Kokotoa gharama ya malighafi, ishone, kisha waombe watu watatu maoni ya kweli." } },
  { id: "farming-bed", area: "farming", kind: "project", title: { en: "Plant a small kitchen-garden bed", sw: "Panda tuta dogo la bustani ya nyumbani" }, body: { en: "Prepare one small bed with fast-growing vegetables. Record watering, growth and harvest for six weeks.", sw: "Andaa tuta moja dogo lenye mboga zinazokua haraka. Andika umwagiliaji, ukuaji na mavuno kwa wiki sita." } },
  { id: "farming-recipe", area: "farming", kind: "exercise", title: { en: "Cost one dish you could sell", sw: "Kokotoa gharama ya chakula kimoja unachoweza kuuza" }, body: { en: "Pick one dish. Write every ingredient with its price, then work out the cost of one plate and a fair selling price.", sw: "Chagua chakula kimoja. Andika kila kiungo na bei yake, kisha kokotoa gharama ya sahani moja na bei nzuri ya kuuza." } },
  { id: "teaching-lesson", area: "teaching", kind: "project", title: { en: "Teach one 20-minute lesson", sw: "Fundisha somo moja la dakika 20" }, body: { en: "Plan a short lesson on something you know well. Teach it to two or three people and ask what was clear and what was not.", sw: "Panga somo fupi kuhusu jambo unalolijua vizuri. Wafundishe watu wawili au watatu na uwaulize kilichoeleweka na kisichoeleweka." } },
  { id: "teaching-translate", area: "teaching", kind: "exercise", title: { en: "Translate a one-page notice", sw: "Tafsiri tangazo la ukurasa mmoja" }, body: { en: "Take a public notice and translate it into another language you speak. Ask a fluent speaker to correct it.", sw: "Chukua tangazo la umma na ulitafsiri kwa lugha nyingine unayoijua. Mwombe mzungumzaji fasaha alisahihishe." } },
  { id: "care-firstaid", area: "care", kind: "tutorial", title: { en: "Learn five first-aid basics", sw: "Jifunze mambo matano ya msingi ya huduma ya kwanza" }, body: { en: "With a trained health worker, learn what to do for bleeding, burns, choking, fainting and dehydration — and when to get help.", sw: "Pamoja na mhudumu wa afya aliyefunzwa, jifunze la kufanya mtu anapovuja damu, kuungua, kupaliwa, kuzimia na kupungukiwa maji — na wakati wa kutafuta msaada." } },
  { id: "care-listen", area: "care", kind: "exercise", title: { en: "Practise careful listening", sw: "Fanya mazoezi ya kusikiliza kwa makini" }, body: { en: "Listen to someone for ten minutes without interrupting. Then repeat back what you understood and ask if you got it right.", sw: "Msikilize mtu kwa dakika kumi bila kumkatiza. Kisha rudia ulichoelewa na umuulize kama umeelewa sawasawa." } },
  { id: "business-survey", area: "business", kind: "exercise", title: { en: "Ask ten people what they need", sw: "Waulize watu kumi wanahitaji nini" }, body: { en: "Ask ten neighbours what is hard to find or too expensive. Write the answers down and look for what repeats.", sw: "Waulize majirani kumi ni nini ni vigumu kupata au ni ghali mno. Andika majibu na utafute yanayojirudia." } },
  { id: "business-cashbook", area: "business", kind: "project", title: { en: "Keep a cash book for two weeks", sw: "Weka daftari la fedha kwa wiki mbili" }, body: { en: "Every day, write money in and money out — for a business or your home. At the end, find where most money went.", sw: "Kila siku, andika pesa zinazoingia na zinazotoka — kwa biashara au nyumbani. Mwishoni, tafuta pesa nyingi zilikwenda wapi." } },
  { id: "creative-poster", area: "creative", kind: "project", title: { en: "Design a poster for a real event", sw: "Sanifu bango la tukio halisi" }, body: { en: "Find a local event or business and design a poster for it by hand or on a phone. Show two versions and ask which works better.", sw: "Tafuta tukio au biashara ya karibu na uisanifie bango kwa mkono au kwa simu. Onyesha matoleo mawili na uulize lipi ni bora." } },
  { id: "creative-story", area: "creative", kind: "exercise", title: { en: "Tell a story in five photos", sw: "Simulia hadithi kwa picha tano" }, body: { en: "With any phone camera, tell one story in exactly five photos: beginning, middle and end. Ask people what story they see.", sw: "Kwa kamera yoyote ya simu, simulia hadithi moja kwa picha tano tu: mwanzo, kati na mwisho. Waulize watu wanaona hadithi gani." } },
  { id: "community-meeting", area: "community", kind: "project", title: { en: "Plan and run a short meeting", sw: "Panga na uendeshe mkutano mfupi" }, body: { en: "Organise a 30-minute meeting on one local issue. Write an agenda before and three agreed actions after.", sw: "Andaa mkutano wa dakika 30 kuhusu suala moja la eneo lenu. Andika ajenda kabla na hatua tatu zilizokubaliwa baada yake." } },
  { id: "community-report", area: "community", kind: "exercise", title: { en: "Write a one-page activity report", sw: "Andika ripoti ya shughuli ya ukurasa mmoja" }, body: { en: "Describe one activity you took part in: what happened, who came, what worked and what you would change.", sw: "Eleza shughuli moja uliyoshiriki: nini kilifanyika, nani alikuja, nini kilifanikiwa na nini ungebadilisha." } },
];

/** Independent free learning sites. They are not partners of this project. */
export const LEARNING_SITES = [
  { name: "Khan Academy", url: "https://www.khanacademy.org", about: { en: "Maths, science and computing lessons", sw: "Masomo ya hisabati, sayansi na kompyuta" } },
  { name: "freeCodeCamp", url: "https://www.freecodecamp.org", about: { en: "Learn to build websites and write code", sw: "Jifunze kutengeneza tovuti na kuandika programu" } },
  { name: "Alison", url: "https://alison.com", about: { en: "Short courses in business, health and trades", sw: "Kozi fupi za biashara, afya na ufundi" } },
  { name: "Duolingo", url: "https://www.duolingo.com", about: { en: "Language practice in short daily lessons", sw: "Mazoezi ya lugha kwa masomo mafupi ya kila siku" } },
];

export type Career = { id: string; areas: AreaId[]; needs: "none" | "certificate" | "diploma"; title: L; does: L; start: L };

export const CAREERS: Career[] = [
  { id: "it-support", areas: ["digital", "trades"], needs: "none", title: { en: "Phone & computer repair technician", sw: "Fundi wa simu na kompyuta" }, does: { en: "Fixes phones and computers, installs software and helps people use their devices.", sw: "Hukarabati simu na kompyuta, huweka programu na kuwasaidia watu kutumia vifaa vyao." }, start: { en: "Practise on old devices, then offer low-cost repairs to build trust.", sw: "Fanya mazoezi kwa vifaa vya zamani, kisha toa huduma za ukarabati kwa bei nafuu ili kujenga uaminifu." } },
  { id: "online-worker", areas: ["digital", "business"], needs: "none", title: { en: "Online freelancer (data entry, transcription)", sw: "Mfanyakazi huru wa mtandaoni (kuingiza data, unukuzi)" }, does: { en: "Completes typing, data and transcription tasks for clients over the internet.", sw: "Hukamilisha kazi za kuchapa, data na unukuzi kwa wateja kupitia intaneti." }, start: { en: "Raise your typing speed and accuracy, and prepare two sample pieces of work.", sw: "Ongeza kasi na usahihi wa kuchapa, na uandae sampuli mbili za kazi." } },
  { id: "web-dev", areas: ["digital", "creative"], needs: "none", title: { en: "Web & app builder", sw: "Mtengenezaji wa tovuti na programu" }, does: { en: "Builds websites and simple apps for businesses and organisations.", sw: "Hutengeneza tovuti na programu rahisi kwa biashara na mashirika." }, start: { en: "Follow a free coding course and publish three small projects to show.", sw: "Fuata kozi ya bure ya uandishi wa programu na uchapishe miradi mitatu midogo ya kuonyesha." } },
  { id: "electrician", areas: ["trades"], needs: "certificate", title: { en: "Electrician or solar installer", sw: "Fundi umeme au mfungaji wa sola" }, does: { en: "Installs and maintains wiring, lighting and solar power systems safely.", sw: "Hufunga na kutunza nyaya, taa na mifumo ya umeme wa jua kwa usalama." }, start: { en: "Electrical work is dangerous without training — look for a recognised technical course first.", sw: "Kazi ya umeme ni hatari bila mafunzo — tafuta kwanza kozi ya ufundi inayotambulika." } },
  { id: "builder", areas: ["trades"], needs: "none", title: { en: "Mason, carpenter or welder", sw: "Mwashi, seremala au mchomeleaji" }, does: { en: "Builds and repairs homes, furniture, doors and metalwork.", sw: "Hujenga na kukarabati nyumba, samani, milango na vyuma." }, start: { en: "Assist an experienced fundi and keep photos of every finished job.", sw: "Msaidie fundi mzoefu na uhifadhi picha za kila kazi iliyokamilika." } },
  { id: "tailor", areas: ["tailoring", "creative"], needs: "none", title: { en: "Tailor or fashion designer", sw: "Mshonaji au mbunifu wa mitindo" }, does: { en: "Sews, alters and designs clothing, uniforms and household items.", sw: "Hushona, hurekebisha na kubuni nguo, sare na bidhaa za nyumbani." }, start: { en: "Make a small sample collection and take orders for repairs and alterations.", sw: "Tengeneza mkusanyiko mdogo wa sampuli na upokee oda za marekebisho ya nguo." } },
  { id: "grower", areas: ["farming"], needs: "none", title: { en: "Vegetable grower or poultry keeper", sw: "Mkulima wa mboga au mfugaji wa kuku" }, does: { en: "Grows vegetables or raises poultry to sell to households and food sellers.", sw: "Hulima mboga au kufuga kuku kwa ajili ya kuuza kwa kaya na wauza chakula." }, start: { en: "Begin with one bed or a few birds and record every cost and sale.", sw: "Anza na tuta moja au kuku wachache na uandike kila gharama na mauzo." } },
  { id: "food-seller", areas: ["farming", "business"], needs: "none", title: { en: "Food seller or caterer", sw: "Muuza chakula au mpishi wa matukio" }, does: { en: "Prepares and sells meals, snacks or catering for events.", sw: "Huandaa na kuuza milo, vitafunio au chakula cha matukio." }, start: { en: "Perfect two or three dishes, cost each plate and keep your cooking area very clean.", sw: "Boresha vyakula viwili au vitatu, kokotoa gharama ya kila sahani na uweke eneo la kupikia safi sana." } },
  { id: "tutor", areas: ["teaching"], needs: "none", title: { en: "Tutor or teaching assistant", sw: "Mwalimu wa ziada au msaidizi wa mwalimu" }, does: { en: "Helps learners with reading, maths, languages or exam preparation.", sw: "Huwasaidia wanafunzi kusoma, hisabati, lugha au maandalizi ya mitihani." }, start: { en: "Tutor a few learners, track their progress and ask parents for a reference.", sw: "Wafundishe wanafunzi wachache, fuatilia maendeleo yao na uwaombe wazazi barua ya mapendekezo." } },
  { id: "teacher", areas: ["teaching", "community"], needs: "diploma", title: { en: "Trained teacher", sw: "Mwalimu aliyehitimu" }, does: { en: "Plans and teaches lessons for a class and assesses learners' progress.", sw: "Hupanga na kufundisha masomo ya darasa na kutathmini maendeleo ya wanafunzi." }, start: { en: "Teaching posts usually ask for a teaching qualification — look for teacher-training scholarships.", sw: "Nafasi za ualimu kwa kawaida huhitaji sifa ya ualimu — tafuta ufadhili wa mafunzo ya ualimu." } },
  { id: "interpreter", areas: ["teaching", "community"], needs: "none", title: { en: "Interpreter or translator", sw: "Mkalimani au mtafsiri" }, does: { en: "Helps people and organisations understand each other across languages.", sw: "Huwasaidia watu na mashirika kuelewana kati ya lugha tofauti." }, start: { en: "List your languages and levels, and practise translating real notices accurately.", sw: "Orodhesha lugha zako na viwango vyake, na ufanye mazoezi ya kutafsiri matangazo halisi kwa usahihi." } },
  { id: "health-worker", areas: ["care", "community"], needs: "certificate", title: { en: "Community health worker", sw: "Mhudumu wa afya ya jamii" }, does: { en: "Shares health information, visits households and refers people to clinics.", sw: "Hutoa elimu ya afya, hutembelea kaya na kuwaelekeza watu kwenye zahanati." }, start: { en: "This role needs recognised health training — ask a health facility about courses.", sw: "Kazi hii inahitaji mafunzo ya afya yanayotambulika — uliza kituo cha afya kuhusu kozi." } },
  { id: "caregiver", areas: ["care"], needs: "none", title: { en: "Childcare or home caregiver", sw: "Mlezi wa watoto au mhudumu wa nyumbani" }, does: { en: "Looks after children, older people or people with disabilities safely and kindly.", sw: "Huwatunza watoto, wazee au watu wenye ulemavu kwa usalama na upole." }, start: { en: "Learn first aid and child safety, and collect references from families you help.", sw: "Jifunze huduma ya kwanza na usalama wa mtoto, na ukusanye mapendekezo kutoka kwa familia unazosaidia." } },
  { id: "trader", areas: ["business"], needs: "none", title: { en: "Shopkeeper or trader", sw: "Mwenye duka au mfanyabiashara" }, does: { en: "Buys goods and sells them to customers at a small profit, many times over.", sw: "Hununua bidhaa na kuwauzia wateja kwa faida ndogo, mara nyingi." }, start: { en: "Start with a few fast-selling items and write down every sale.", sw: "Anza na bidhaa chache zinazouzika haraka na uandike kila mauzo." } },
  { id: "bookkeeper", areas: ["business", "digital"], needs: "certificate", title: { en: "Bookkeeper or accounts assistant", sw: "Mtunza vitabu au msaidizi wa uhasibu" }, does: { en: "Records income and spending for businesses and groups and prepares simple reports.", sw: "Huandika mapato na matumizi ya biashara na vikundi na kuandaa ripoti rahisi." }, start: { en: "Take a basic bookkeeping course and offer to keep records for a savings group.", sw: "Soma kozi ya msingi ya utunzaji wa vitabu na ujitolee kuweka kumbukumbu za kikundi cha akiba." } },
  { id: "media", areas: ["creative"], needs: "none", title: { en: "Photographer, videographer or designer", sw: "Mpiga picha, mpiga video au msanifu" }, does: { en: "Creates photos, videos and designs for events, businesses and organisations.", sw: "Hutengeneza picha, video na usanifu kwa matukio, biashara na mashirika." }, start: { en: "Build a portfolio of ten strong pieces and cover one real event.", sw: "Jenga jalada la kazi kumi imara na ushughulikie tukio moja halisi." } },
  { id: "mobiliser", areas: ["community", "care"], needs: "none", title: { en: "Community mobiliser or outreach assistant", sw: "Mhamasishaji wa jamii au msaidizi wa uhamasishaji" }, does: { en: "Shares information, gathers feedback and connects people to services.", sw: "Hutoa taarifa, hukusanya maoni na kuwaunganisha watu na huduma." }, start: { en: "Volunteer with a community group and practise writing short clear reports.", sw: "Jitolee katika kikundi cha jamii na ufanye mazoezi ya kuandika ripoti fupi zilizo wazi." } },
];

export type Guide = { id: string; title: L; intro: L; steps: L[] };

export const GUIDES: Guide[] = [
  {
    id: "start",
    title: { en: "Starting a small business in Kakuma", sw: "Kuanzisha biashara ndogo Kakuma" },
    intro: { en: "Begin with what people around you already need, and with what you already have.", sw: "Anza na kile ambacho watu wanaokuzunguka tayari wanahitaji, na kile ulicho nacho tayari." },
    steps: [
      { en: "Walk through your area and note what people queue for, travel far for, or complain about.", sw: "Tembea katika eneo lako na uandike vitu ambavyo watu hupanga foleni kuvipata, husafiri mbali kuvifuata, au hulalamikia." },
      { en: "Choose one idea you can start with very little money.", sw: "Chagua wazo moja unaloweza kuanza nalo kwa pesa kidogo sana." },
      { en: "Sell to five customers first. Listen to what they say before you spend more.", sw: "Wauzie wateja watano kwanza. Sikiliza wanachosema kabla ya kutumia pesa zaidi." },
      { en: "Ask a trusted local organisation or community leader which permits or registration apply before you grow.", sw: "Uliza shirika la karibu linaloaminika au kiongozi wa jamii ni vibali au usajili gani unahitajika kabla ya kukua." },
    ],
  },
  {
    id: "plan",
    title: { en: "Writing a one-page business plan", sw: "Kuandika mpango wa biashara wa ukurasa mmoja" },
    intro: { en: "A plan is simply your answers to six questions, written down.", sw: "Mpango ni majibu yako tu ya maswali sita, yaliyoandikwa." },
    steps: [
      { en: "What will I sell, and what problem does it solve?", sw: "Nitauza nini, na kinatatua tatizo gani?" },
      { en: "Who exactly will buy it, and where are they?", sw: "Nani hasa atanunua, na wako wapi?" },
      { en: "Who else sells this, and why would people choose me?", sw: "Nani mwingine anauza hiki, na kwa nini watu wanichague mimi?" },
      { en: "What do I need to start — tools, stock, space — and what does each cost?", sw: "Ninahitaji nini kuanza — zana, bidhaa, eneo — na kila kimoja ni bei gani?" },
      { en: "What will I charge, and how many sales cover my costs each week?", sw: "Nitatoza kiasi gani, na mauzo mangapi yatalipia gharama zangu kila wiki?" },
      { en: "What could go wrong, and what will I do then?", sw: "Nini kinaweza kwenda vibaya, na nitafanya nini wakati huo?" },
    ],
  },
  {
    id: "marketing",
    title: { en: "Marketing without a big budget", sw: "Kutangaza biashara bila bajeti kubwa" },
    intro: { en: "Good work that people talk about is the strongest advertisement.", sw: "Kazi nzuri ambayo watu huizungumzia ndiyo tangazo lenye nguvu zaidi." },
    steps: [
      { en: "Give every customer a reason to tell one more person — do a little more than promised.", sw: "Mpe kila mteja sababu ya kumwambia mtu mmoja zaidi — fanya zaidi kidogo ya ulichoahidi." },
      { en: "Make a clear sign with what you sell and your prices.", sw: "Tengeneza bango lililo wazi lenye unachouza na bei zako." },
      { en: "Share photos of your work in community messaging groups, with permission.", sw: "Shiriki picha za kazi yako katika vikundi vya ujumbe vya jamii, kwa ruhusa." },
      { en: "Ask happy customers for a short recommendation you can show others.", sw: "Waombe wateja walioridhika pendekezo fupi unaloweza kuwaonyesha wengine." },
    ],
  },
  {
    id: "money",
    title: { en: "Managing your money", sw: "Kusimamia pesa zako" },
    intro: { en: "Many small businesses fail not from lack of customers, but from mixed-up money.", sw: "Biashara nyingi ndogo hushindwa si kwa kukosa wateja, bali kwa kuchanganya pesa." },
    steps: [
      { en: "Write down every sale and every expense, every day.", sw: "Andika kila mauzo na kila matumizi, kila siku." },
      { en: "Keep business money apart from household money.", sw: "Tenganisha pesa za biashara na pesa za nyumbani." },
      { en: "Pay yourself a fixed small amount rather than taking from the cash box.", sw: "Jilipe kiasi kidogo maalum badala ya kuchukua kutoka kwenye sanduku la pesa." },
      { en: "Save a little each week for restocking and for emergencies.", sw: "Weka akiba kidogo kila wiki kwa ajili ya kununua bidhaa na dharura." },
      { en: "Be careful with credit: sell on credit only to people you know will pay.", sw: "Kuwa makini na mkopo: uza kwa mkopo kwa watu unaojua watalipa tu." },
    ],
  },
  {
    id: "talent",
    title: { en: "Turning a talent into income", sw: "Kugeuza kipaji kuwa kipato" },
    intro: { en: "Something you do easily may be something others will pay for.", sw: "Jambo unalolifanya kwa urahisi linaweza kuwa jambo ambalo wengine watalilipia." },
    steps: [
      { en: "Write three things people often ask you to help with.", sw: "Andika mambo matatu ambayo watu mara nyingi hukuomba uwasaidie." },
      { en: "Pick one and describe it as a service with a clear price.", sw: "Chagua moja na ulieleze kama huduma yenye bei iliyo wazi." },
      { en: "Do it for three paying customers and ask what would make it better.", sw: "Wafanyie wateja watatu wanaolipa na uulize nini kingeifanya iwe bora." },
      { en: "Add each finished job to your portfolio as proof.", sw: "Ongeza kila kazi iliyokamilika kwenye jalada lako kama ushahidi." },
    ],
  },
];

export const OPPORTUNITY_KINDS: Option[] = [
  { id: "job", label: { en: "Jobs", sw: "Ajira" } },
  { id: "internship", label: { en: "Internships", sw: "Mafunzo kazini" } },
  { id: "scholarship", label: { en: "Scholarships", sw: "Ufadhili wa masomo" } },
  { id: "training", label: { en: "Vocational training", sw: "Mafunzo ya ufundi" } },
  { id: "volunteering", label: { en: "Volunteering", sw: "Kujitolea" } },
  { id: "freelance", label: { en: "Freelance gigs", sw: "Kazi huru" } },
];
