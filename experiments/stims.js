//profession, question with profession (Q), correct answer for Q, statement 1, statment 2 (minus pronoun), Carreiras weight

var maleSet = [
  {
    profession: "paratrooper",
    statement1: "The paratrooper was very moody and hard to get along with.",
    statement2: " seemed to be liked by no one in the squad.",
    statements: ["The paratrooper was very moody and hard to get along with.", " seemed to be liked by no one in the squad."],
    question: "Was the paratrooper likeable?",
    correctResponse: "No",
    weight: "1.24",
   },
  {
    profession: "football player",
    statement1: "The football player spent hours in the whirlpool each day.",
    statement2: " had injured an ankle, and the whirlpool eased the pain.",
    statements: ["The soccer player spent hours in the whirlpool each day.", " had injured an ankle, and the whirlpool eased the pain."],
    question: "Did the soccer player spend hours in a whirlpool?",
    correctResponse: "Yes",
    weight: "1.57",
  },
  {
    profession: "butcher",
    statement1: "The butcher seemed a little distracted.",
    statement2: " said that there were several family members who were in the hospital.",
    statements: ["The butcher seemed a little distracted.", " said that there were several family members who were in the hospital."],
    question: "Did the butcher seem angry?",
    correctResponse: "No",
    weight: "1.77"
  },
  {
    profession: "pilot",
    statement1: "The pilot announced the time and the weather.",
    statement2: " indicated that the plane would be landing a little ahead of schedule.",
    statements: ["The pilot announced the time and the weather.", " indicated that the plane would be landing a little ahead of schedule."],
    question: "Was the plane going to arrive late?",
    correctResponse: "No",
    weight: "2.07",
  },
  {
    profession: "plumber",
    statement1: "The plumber stopped by the diner on the way home from work.",
    statement2: " order the special – catfish sandwich and fries.",
    statements: ["The plumber stopped by the diner on the way home from work.", " order the special – catfish sandwich and fries."],
    question: "Did the special a catfish sandwhich?",
    correctResponse: "Yes",
    weight: "1.83",
  },
  {
    profession: "undertaker",
    statement1: "The undertaker went outside to smoke.",
    statement2: " finished smoking two cigarettes before returning inside.",
    statements: ["The undertaker went outside to smoke.", " finished smoking two cigarettes before returning inside."],
    question: "Did the undertaker smoke three cigarettes?",
    correctResponse: "No",
    weight: "1.97",
  },
  {
    profession: "electrician",
    statement1: "The electrician examined the light fixing.",
    statement2: " needed a special attachment to fix it.",
    statements: ["The electrician examined the light fixing.", " needed a special attachment to fix it."],
    question: "Was the electrician mending a stereo?",
    correctResponse: "No",
    weight: "2.20"
  },
  {
    profession: "farmer",
    statement1: "The farmer was worried about the next harvest.",
    statement2: " was concerned there wouldn't be enough rain.",
    statements: ["The farmer was worried about the next harvest.", " was concerned there wouldn't be enough rain."],
    question: "Was the farmer concerned there wouldn't be enough rain?",
    correctResponse: "Yes",
    weight: "2.27"
  },
  {
    profession: "carpenter",
    statement1: "The carpenter walked to the grocery store.",
    statement2: " didn't make eye contact with anyone passing by.",
    statements: ["The carpenter walked to the grocery store.", " didn't make eye contact with anyone passing by."],
    question: "Did the carpenter make eye contact with passersby?",
    correctResponse: "No",
    weight: "2.47"
  },
  {
    profession: "taxi driver",
    statement1: "The taxi driver took the twenty dollar bill.",
    statement2: " immediately thought it might be counterfeit.",
    statements: ["The taxi driver took the twenty dollar bill.", " immediately thought it might be counterfeit."],
    question: "Did the taxi driver take a ten dollar bill?",
    correctResponse: "No",
    weight: "2.50",
  }];

  var neutralSet = [
  {
    profession: "art historian",
    statement1: "The art historian gets many invitations to speak at college campuses.",
    statement2: " only accepts a few in the New England area.",
    statements: ["The art historian gets many invitations to speak at college campuses.", " only accepts a few in the New England area."],
    question: "Does the art historian speak outside of the New England area?",
    correctResponse: "No",
    weight: "5.33",
  },
  {
    profession: "pediatrician",
    statement1: "The pediatrician gave out free gift bags to all of his appointments.",
    statement2: " included in each gift bag the child's favorite candy.",
    statements: ["The pediatrician gave out free gift bags to all of his appointments.", " included in each gift bag the child's favorite candy."],
    question: "Did the pediatrician give out free gift bags to only some of his appointments?",
    correctResponse: "No",
    weight: "5.43"
  },
  {
    profession: "student",
    statement1: "The student seemed upset and pale.",
    statement2: " then asked for a glass of water.",
    statements: ["The student seemed upset and pale.", " then asked for a glass of water."],
    question: "Did the student ask for a glass of water?",
    correctResponse: "Yes",
    weight: "5.60"
  },
  {
    profession: "psychologist",
    statement1: "The psychologist liked to visit the zoo.",
    statement2: " found watching the animals to be a perfect way to relax after work.",
    statements: ["The psychologist liked to visit the zoo.", " found watching the animals to be a perfect way to relax after work."],
    question: "Did the psychologist visit the zoo after work?",
    correctResponse: "Yes",
    weight: "5.73"
  },
  {
    profession: "astrologer",
    statement1: "The astrologer got a sweepstakes entry in the mail.",
    statement2: " decided to fill it out and mail it in.",
    statements: ["The astrologer got a sweepstakes entry in the mail.", " decided to fill it out and mail it in."],
    question: "Was what the astrologer got in the mail a survey?",
    correctResponse: "No",
    weight: "5.80"
  },
  {
    profession: "swimmer",
    statement1: "The swimmer attended a press conference before the latest competition.",
    statement2: " said that there was every reason to expect a gold medal.",
    statements: ["The swimmer attended a press conference before the latest competition.", " said that there was every reason to expect a gold medal."],
    question: "Was the swimmer at a press conference?",
    correctResponse: "Yes",
    weight: "5.83"
  },
  {
    profession: "interior designer",
    statement1: "The interior designer inspected the ballroom before the gala.",
    statement2: " found everything in perfect order.",
    statements: ["The interior designer inspected the ballroom before the gala.", " found everything in perfect order."],
    question: "Was the interior designer inspecting the garden?",
    correctResponse: "No",
    weight: "6.70"
  },
  {
    profession: "singer",
    statement1: "The singer spent hours every week watching television.",
    statement2: " would watch even more if it were possible.",
    statements: ["The singer spent hours every week watching television.", " would watch even more if it were possible."],
    question: "Did the singer like watching television?",
    correctResponse: "Yes",
    weight: "6.13"
  },
  {
    profession: "interpreter",
    statement1: "The interpreter checked the documents carefully.",
    statement2: " signed them and put them in the outgoing mail.",
    statements: ["The interpreter checked the documents carefully.", " signed them and put them in the outgoing mail."],
    question: "Did the interpreter put the documents in the trash?",
    correctResponse: "No",
    weight: "6.53"
  },
  {
    profession: "bank clerk",
    statement1: "The bank clerk had worked in that town for over thirty years.",
    statement2: " knew just about everyone who lived there.",
    statements: ["The bank clerk had worked in that town for over thirty years.", " knew just about everyone who lived there."],
    question: "Had the bank clerk worked in that town for over ten years?",
    correctResponse: "Yes",
    weight: "6.57"
  }];

  var femaleSet = [
  {
    profession: "nurse",
    statement1: "The nurse examined the medication carefully.",
    statement2: " then wrote something on the chart then left.",
    statements: ["The nurse examined the medication carefully.", " then wrote something on the chart then left."],
    question: "Was the nurse examining medication?",
    correctResponse: "Yes",
    weight: "9.07",
  },
  {
    profession: "cleaner",
    statement1: "The cleaner read the instriuctions on the bottle very carefully.",
    statement2: "PRONOUN then began to mix the cleaning solution.",
    statements: ["The cleaner read the instriuctions on the bottle very carefully.", " then began to mix the cleaning solution."],
    question: "Was the cleaner mixing a cleaning solution?",
    correctResponse: "Yes",
    weight: "9.17"
  },
  {
    profession: "baby sitter",
    statement1: "The baby sitter found out about the practical joke.",
    statement2: " remained calm for several minutes, but then started to yell at everyone.",
    statements: ["The baby sitter found out about the practical joke.", " remained calm for several minutes, but then started to yell at everyone."],
    question: "Did the baby sitter react poorly to the practical joke?",
    correctResponse: "Yes",
    weight: "9.33"
  },
  {
    profession: "fortune teller",
    statement1: "The fortune teller traveled with the carnival.",
    statement2: " had been born into the carnival life and never wanted to leave it.",
    statements: ["The fortune teller traveled with the carnival.", " had been born into the carnival life and never wanted to leave it."],
    question: "Did the fortune teller join the circus as a teenager?",
    correctResponse: "No",
    weight: "9.47"
  },
  {
    profession: "receptionist",
    statement1: "The receptionist received an invitation to a charity benefit.",
    statement2: " decided not to go because there was a lot piling up at work.",
    statements: ["The receptionist received an invitation to a charity benefit.", " decided not to go because there was a lot piling up at work."],
    question: "Did the receptionist receive an invitation to a charity benefit?",
    correctResponse: "Yes",
    weight: "9.57"
  },
  {
    profession: "dental assistant",
    statement1: "The dental assistant made several recommendations.",
    statement2: " stressed the importance of avoiding sugary snacks.",
    statements: ["The dental assistant made several recommendations.", " stressed the importance of avoiding sugary snacks."],
    question: "Did the dental assistant encourage avoiding sugary snacks?",
    correctResponse: "Yes",
    weight: "9.63"
  },
  {
    profession: "secretary",
    statement1: "The secretary distributed an urgent memo.",
    statement2: " made is clear that work would continue as normal.",
    statements: ["The secretary distributed an urgent memo.", " made is clear that work would continue as normal."],
    question: "Was the memo urgent?",
    correctResponse: "Yes",
    weight: "9.70"
  },
  {
    profession: "housekeeper",
    statement1: "The housekeeper always showed up late for work.",
    statement2: " acquired a reputation for being difficult to work with.",
    statements: ["The housekeeper always showed up late for work.", " acquired a reputation for being difficult to work with."],
    question: "Did the housekeeper always show up for work on time?",
    correctResponse: "No",
    weight: "9.97"
  },
  {
    profession: "midwife",
    statement1: "The midwife read the newspaper everyday.",
    statement2: " tried to keep informed about national and world news.",
    statements: ["The midwife read the newspaper everyday.", " tried to keep informed about national and world news."],
    question: "Did the midwife read the newspaper once a week?",
    correctResponse: "No",
    weight: "10.27"
  },
  {
    profession: "cheerleader",
    statement1: "The cheerleader arrived early for the game.",
    statement2: " was amazed to see how many people were there.",
    statements: ["The cheerleader arrived early for the game.", " was amazed to see how many people were there."],
    question: "Was the cheerleader late for the game?",
    correctResponse: "No",
    weight: "10.77"
  }];
