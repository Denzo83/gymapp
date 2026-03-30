export const CATEGORIES = [
  { id: "push",     label: "Push",     emoji: "💪", bg: "#fce4f0", color: "#b94c7a" },
  { id: "pull",     label: "Pull",     emoji: "🔄", bg: "#daf4fc", color: "#1e7fa0" },
  { id: "legs",     label: "Legs",     emoji: "🦵", bg: "#d6f7e6", color: "#1e8a52" },
  { id: "core",     label: "Core",     emoji: "🔥", bg: "#fef3c7", color: "#a06b08" },
  { id: "cardio",   label: "Cardio",   emoji: "❤️", bg: "#ffe4e0", color: "#c03e2e" },
  { id: "mobility", label: "Mobility", emoji: "🧘", bg: "#ede9fe", color: "#6d28d9" },
];

export const EQUIPMENT_TYPES = [
  "barbell", "dumbbell", "cable", "machine", "bodyweight", "kettlebell", "resistance band", "other"
];

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const DEFAULT_EXERCISES = [
  // PUSH
  { id:"e001", name:"Bench Press",             category:"push",     equipment:"barbell",        muscles:["chest","triceps","front delts"] },
  { id:"e002", name:"Incline Dumbbell Press",   category:"push",     equipment:"dumbbell",       muscles:["upper chest","front delts"] },
  { id:"e003", name:"Overhead Press",           category:"push",     equipment:"barbell",        muscles:["shoulders","triceps"] },
  { id:"e004", name:"Dumbbell Shoulder Press",  category:"push",     equipment:"dumbbell",       muscles:["shoulders","triceps"] },
  { id:"e005", name:"Lateral Raises",           category:"push",     equipment:"dumbbell",       muscles:["side delts"] },
  { id:"e006", name:"Tricep Pushdown",          category:"push",     equipment:"cable",          muscles:["triceps"] },
  { id:"e007", name:"Skull Crushers",           category:"push",     equipment:"barbell",        muscles:["triceps"] },
  { id:"e008", name:"Chest Fly (Dumbbell)",     category:"push",     equipment:"dumbbell",       muscles:["chest"] },
  { id:"e009", name:"Cable Chest Fly",          category:"push",     equipment:"cable",          muscles:["chest"] },
  { id:"e010", name:"Push-Ups",                 category:"push",     equipment:"bodyweight",     muscles:["chest","triceps"] },
  { id:"e011", name:"Arnold Press",             category:"push",     equipment:"dumbbell",       muscles:["shoulders"] },
  { id:"e012", name:"Pec Deck",                 category:"push",     equipment:"machine",        muscles:["chest"] },
  { id:"e013", name:"Dips",                     category:"push",     equipment:"bodyweight",     muscles:["chest","triceps"] },
  { id:"e014", name:"Front Raises",             category:"push",     equipment:"dumbbell",       muscles:["front delts"] },
  { id:"e015", name:"Cable Lateral Raise",      category:"push",     equipment:"cable",          muscles:["side delts"] },

  // PULL
  { id:"e016", name:"Pull-Ups",                 category:"pull",     equipment:"bodyweight",     muscles:["lats","biceps"] },
  { id:"e017", name:"Lat Pulldown",             category:"pull",     equipment:"cable",          muscles:["lats","biceps"] },
  { id:"e018", name:"Seated Cable Row",         category:"pull",     equipment:"cable",          muscles:["mid back","biceps"] },
  { id:"e019", name:"Barbell Row",              category:"pull",     equipment:"barbell",        muscles:["back","biceps"] },
  { id:"e020", name:"Dumbbell Row",             category:"pull",     equipment:"dumbbell",       muscles:["lats","mid back"] },
  { id:"e021", name:"Dumbbell Curl",            category:"pull",     equipment:"dumbbell",       muscles:["biceps"] },
  { id:"e022", name:"Barbell Curl",             category:"pull",     equipment:"barbell",        muscles:["biceps"] },
  { id:"e023", name:"Hammer Curl",              category:"pull",     equipment:"dumbbell",       muscles:["biceps","forearms"] },
  { id:"e024", name:"Face Pulls",               category:"pull",     equipment:"cable",          muscles:["rear delts","traps"] },
  { id:"e025", name:"Chest-Supported Row",      category:"pull",     equipment:"dumbbell",       muscles:["mid back","rear delts"] },
  { id:"e026", name:"Shrugs",                   category:"pull",     equipment:"dumbbell",       muscles:["traps"] },
  { id:"e027", name:"Cable Pullover",           category:"pull",     equipment:"cable",          muscles:["lats"] },
  { id:"e028", name:"Preacher Curl",            category:"pull",     equipment:"machine",        muscles:["biceps"] },
  { id:"e029", name:"Straight Arm Pulldown",    category:"pull",     equipment:"cable",          muscles:["lats"] },

  // LEGS
  { id:"e030", name:"Back Squat",               category:"legs",     equipment:"barbell",        muscles:["quads","glutes","hamstrings"] },
  { id:"e031", name:"Front Squat",              category:"legs",     equipment:"barbell",        muscles:["quads","core"] },
  { id:"e032", name:"Romanian Deadlift",        category:"legs",     equipment:"barbell",        muscles:["hamstrings","glutes"] },
  { id:"e033", name:"Deadlift",                 category:"legs",     equipment:"barbell",        muscles:["hamstrings","glutes","back"] },
  { id:"e034", name:"Leg Press",                category:"legs",     equipment:"machine",        muscles:["quads","glutes"] },
  { id:"e035", name:"Bulgarian Split Squat",    category:"legs",     equipment:"dumbbell",       muscles:["quads","glutes"] },
  { id:"e036", name:"Hip Thrust",               category:"legs",     equipment:"barbell",        muscles:["glutes"] },
  { id:"e037", name:"Glute Bridge",             category:"legs",     equipment:"bodyweight",     muscles:["glutes"] },
  { id:"e038", name:"Leg Curl (Machine)",       category:"legs",     equipment:"machine",        muscles:["hamstrings"] },
  { id:"e039", name:"Leg Extension",            category:"legs",     equipment:"machine",        muscles:["quads"] },
  { id:"e040", name:"Calf Raises",              category:"legs",     equipment:"machine",        muscles:["calves"] },
  { id:"e041", name:"Walking Lunges",           category:"legs",     equipment:"dumbbell",       muscles:["quads","glutes"] },
  { id:"e042", name:"Sumo Squat",               category:"legs",     equipment:"dumbbell",       muscles:["inner thighs","glutes"] },
  { id:"e043", name:"Step-Ups",                 category:"legs",     equipment:"dumbbell",       muscles:["quads","glutes"] },
  { id:"e044", name:"Abductor Machine",         category:"legs",     equipment:"machine",        muscles:["abductors","glutes"] },
  { id:"e045", name:"Adductor Machine",         category:"legs",     equipment:"machine",        muscles:["adductors","inner thighs"] },
  { id:"e046", name:"Goblet Squat",             category:"legs",     equipment:"kettlebell",     muscles:["quads","glutes"] },

  // CORE
  { id:"e047", name:"Plank",                    category:"core",     equipment:"bodyweight",     muscles:["core"] },
  { id:"e048", name:"Side Plank",               category:"core",     equipment:"bodyweight",     muscles:["obliques"] },
  { id:"e049", name:"Cable Crunch",             category:"core",     equipment:"cable",          muscles:["abs"] },
  { id:"e050", name:"Hanging Leg Raise",        category:"core",     equipment:"bodyweight",     muscles:["lower abs"] },
  { id:"e051", name:"Russian Twist",            category:"core",     equipment:"dumbbell",       muscles:["obliques"] },
  { id:"e052", name:"Ab Rollout",               category:"core",     equipment:"other",          muscles:["core"] },
  { id:"e053", name:"Dead Bug",                 category:"core",     equipment:"bodyweight",     muscles:["core"] },
  { id:"e054", name:"Bicycle Crunches",         category:"core",     equipment:"bodyweight",     muscles:["abs","obliques"] },
  { id:"e055", name:"Pallof Press",             category:"core",     equipment:"cable",          muscles:["core","obliques"] },
  { id:"e056", name:"Crunch Machine",           category:"core",     equipment:"machine",        muscles:["abs"] },

  // CARDIO
  { id:"e057", name:"Treadmill Run",            category:"cardio",   equipment:"machine",        muscles:["full body"] },
  { id:"e058", name:"Incline Treadmill Walk",   category:"cardio",   equipment:"machine",        muscles:["glutes","calves"] },
  { id:"e059", name:"Stairmaster",              category:"cardio",   equipment:"machine",        muscles:["glutes","quads","calves"] },
  { id:"e060", name:"Rowing Machine",           category:"cardio",   equipment:"machine",        muscles:["full body"] },
  { id:"e061", name:"Stationary Bike",          category:"cardio",   equipment:"machine",        muscles:["legs"] },
  { id:"e062", name:"Assault Bike",             category:"cardio",   equipment:"machine",        muscles:["full body"] },
  { id:"e063", name:"Elliptical",               category:"cardio",   equipment:"machine",        muscles:["full body"] },
  { id:"e064", name:"Ski Erg",                  category:"cardio",   equipment:"machine",        muscles:["lats","core"] },
  { id:"e065", name:"Jump Rope",                category:"cardio",   equipment:"other",          muscles:["calves","cardio"] },
  { id:"e066", name:"Battle Ropes",             category:"cardio",   equipment:"other",          muscles:["arms","core"] },
  { id:"e067", name:"Box Jumps",                category:"cardio",   equipment:"other",          muscles:["legs"] },
  { id:"e068", name:"Sled Push",                category:"cardio",   equipment:"other",          muscles:["legs","full body"] },

  // MOBILITY
  { id:"e069", name:"Hip Flexor Stretch",       category:"mobility", equipment:"bodyweight",     muscles:["hip flexors"] },
  { id:"e070", name:"Pigeon Pose",              category:"mobility", equipment:"bodyweight",     muscles:["hips","glutes"] },
  { id:"e071", name:"Cat-Cow",                  category:"mobility", equipment:"bodyweight",     muscles:["spine"] },
  { id:"e072", name:"World's Greatest Stretch", category:"mobility", equipment:"bodyweight",     muscles:["full body"] },
  { id:"e073", name:"Foam Rolling",             category:"mobility", equipment:"other",          muscles:["full body"] },
  { id:"e074", name:"Thoracic Rotation",        category:"mobility", equipment:"bodyweight",     muscles:["spine","upper back"] },
  { id:"e075", name:"Band Pull-Aparts",         category:"mobility", equipment:"resistance band",muscles:["rear delts","upper back"] },
  { id:"e076", name:"Deep Squat Hold",          category:"mobility", equipment:"bodyweight",     muscles:["hips","ankles"] },
  { id:"e077", name:"Couch Stretch",            category:"mobility", equipment:"bodyweight",     muscles:["hip flexors","quads"] },
];
