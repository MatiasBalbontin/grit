// Spanish search aliases for the exercise picker (Fase 7).
//
// The exercise dataset (1324 entries) keeps English names; body part / equipment / target are
// already translated for display via t(). The only gap is *search*: typing "sentadilla" never
// matched "squat". This maps common Spanish gym vocabulary to the English words that appear in
// an exercise's name / target / equipment, so a Spanish search finds the right lifts without
// translating every name.
//
// Keys are lowercase, unaccented Spanish terms; values are English substrings to also match.
// Matching is loose (substring both ways) but only for queries of 3+ chars, so "sentad" or
// "sentadilla" reach "squat" while 1-2 char fragments ("ba") don't inject noise.
export const ES_ALIASES = {
  // ---- movements ----
  'sentadilla': ['squat'],
  'sentadillas': ['squat'],
  'peso muerto': ['deadlift'],
  'muerto': ['deadlift'],
  'despegue': ['deadlift'],
  'zancada': ['lunge'],
  'zancadas': ['lunge'],
  'estocada': ['lunge'],
  'desplante': ['lunge'],
  'prensa': ['leg press', 'press'],
  'empuje de cadera': ['hip thrust'],
  'puente de gluteo': ['glute bridge', 'bridge'],
  'puente': ['bridge'],
  'peso muerto rumano': ['romanian deadlift', 'rdl'],
  'buenos dias': ['good morning'],
  'gemelo': ['calf'],
  'gemelos': ['calf'],
  'pantorrilla': ['calf'],
  'elevacion de talones': ['calf raise'],
  'extension de pierna': ['leg extension'],
  'curl femoral': ['leg curl', 'lying leg curl'],
  'curl de pierna': ['leg curl'],
  'sentadilla bulgara': ['bulgarian split squat', 'split squat'],
  'sentadilla sissy': ['sissy squat'],
  'sentadilla frontal': ['front squat'],
  'sentadilla hack': ['hack squat'],
  'peso muerto sumo': ['sumo deadlift'],
  'abductores': ['abductor', 'hip abduction'],
  'aductores': ['adductor', 'hip adduction'],

  // ---- push (chest / shoulders / triceps) ----
  'press banca': ['bench press'],
  'press de banca': ['bench press'],
  'banca': ['bench'],
  'press militar': ['overhead press', 'military press', 'shoulder press'],
  'press hombro': ['shoulder press', 'overhead press'],
  'press de hombro': ['shoulder press', 'overhead press'],
  'press inclinado': ['incline press', 'incline bench'],
  'press declinado': ['decline press', 'decline bench'],
  'aperturas': ['fly', 'flye'],
  'apertura': ['fly', 'flye'],
  'cristo': ['fly', 'flye', 'lateral raise'],
  'fondos': ['dip'],
  'fondo': ['dip'],
  'flexiones': ['push-up', 'push up', 'pushup'],
  'flexion': ['push-up', 'push up', 'pushup'],
  'lagartijas': ['push-up', 'push up'],
  'pechadas': ['push-up', 'push up'],
  'elevacion lateral': ['lateral raise', 'side raise'],
  'elevaciones laterales': ['lateral raise'],
  'elevacion frontal': ['front raise'],
  'pajaro': ['rear delt', 'reverse fly', 'bent over lateral'],
  'vuelos': ['fly', 'lateral raise'],
  'extension de triceps': ['triceps extension', 'tricep extension'],
  'triceps': ['triceps', 'tricep'],
  'jalon triceps': ['triceps pushdown', 'pushdown'],
  'patada de triceps': ['triceps kickback', 'kickback'],
  'copa triceps': ['overhead triceps extension', 'triceps extension'],
  'press frances': ['skull crusher', 'skullcrusher', 'french press'],
  'rompecraneos': ['skull crusher', 'skullcrusher'],
  'encogimientos': ['shrug'],
  'trapecio': ['shrug', 'traps'],

  // ---- pull (back / biceps) ----
  'dominadas': ['pull-up', 'pull up', 'pullup', 'chin-up', 'chin up'],
  'dominada': ['pull-up', 'pull up', 'pullup'],
  'barra': ['pull-up', 'pull up', 'pullup', 'barbell'],
  'jalon al pecho': ['lat pulldown', 'pulldown'],
  'jalon': ['pulldown'],
  'remo': ['row'],
  'trapecio': ['trap', 'shrug'],
  'curl': ['curl'],
  'curl de biceps': ['biceps curl', 'bicep curl'],
  'biceps': ['biceps', 'bicep'],
  'curl martillo': ['hammer curl'],
  'curl concentrado': ['concentration curl'],
  'predicador': ['preacher curl', 'preacher'],
  // ---- core ----
  'abdominal': ['crunch', 'sit-up', 'sit up', 'abs'],
  'abdominales': ['crunch', 'sit-up', 'abs'],
  'abdomen': ['abs', 'crunch'],
  'plancha': ['plank'],
  'encogimiento abdominal': ['crunch'],
  'elevacion de piernas': ['leg raise'],
  'rueda abdominal': ['ab wheel', 'rollout'],
  'oblicuos': ['oblique', 'side bend', 'russian twist'],
  'giro ruso': ['russian twist'],
  // ---- equipment ----
  'mancuerna': ['dumbbell'],
  'mancuernas': ['dumbbell'],
  'barra': ['barbell', 'bar'],
  'barra z': ['ez bar', 'ez-bar'],
  'maquina': ['machine', 'lever', 'smith'],
  'cable': ['cable'],
  'banda': ['band', 'resistance band'],
  'banda elastica': ['band'],
  'kettlebell': ['kettlebell'],
  'pesa rusa': ['kettlebell'],
  'disco': ['plate', 'weighted'],
  'multipower': ['smith'],
  'peso corporal': ['body weight', 'bodyweight'],
  // ---- body parts ----
  'pecho': ['chest', 'pectoral'],
  'pectoral': ['chest', 'pectoral'],
  'espalda': ['back', 'lat'],
  'dorsal': ['lat', 'back'],
  'hombro': ['shoulder', 'delt'],
  'hombros': ['shoulder', 'delt'],
  'deltoides': ['delt', 'shoulder'],
  'pierna': ['leg', 'quad', 'thigh'],
  'piernas': ['leg', 'quad'],
  'cuadriceps': ['quad', 'thigh'],
  'femoral': ['hamstring'],
  'isquiotibial': ['hamstring'],
  'gluteo': ['glute'],
  'gluteos': ['glute'],
  'cadera': ['hip'],
  'antebrazo': ['forearm'],
  'cuello': ['neck'],
  'lumbar': ['lower back', 'back extension'],
  'cardio': ['cardio', 'run', 'bike', 'treadmill'],
}

// Given a lowercased, trimmed query, return the English substrings a Spanish term implies.
// Empty for a query with no Spanish match — the caller then relies on its normal English match.
export function esAliasTerms(ql) {
  if (!ql || ql.length < 3) return []   // queries under 3 chars: no alias, pure noise
  const out = new Set()
  for (const key in ES_ALIASES) {
    if (key.includes(ql) || ql.includes(key)) ES_ALIASES[key].forEach(t => out.add(t))
  }
  return [...out]
}
