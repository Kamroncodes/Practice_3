const PassageArray_raw = [
    {type: "title_page",
     page: "Title_Page",
        title_page_title: "School Presentation",
        title_page_img: "images/Title-Fg1.svg",
        title_page_instructions: ["Step 1: Learn the vocabulary words", "Step 2: Read the story", "Step 3: Review", "Step 4: Practice the vocabulary",],
        title_page_icons: ["images/vocab_icon.png", "images/story_icon.png", "images/review_icon.png", "images/practice_icon.png",],
    },
    {type: "vocabulary_page",
     page: "Vocabulary_Main_Page",
        lesson_title: "School Presentation",
        passage_title: "Vocabulary",
        vocabulary_wordlist: ["genuine", "admire", "break_the_ice", "grounded", "compassionate", "bond"],
        instructions: ["If you know all these words already then this story is too easy for you!"]
    },
    {type: "vocabulary_page",
        lesson_title: "School Presentation",
        section_title: "Vocabulary",
        passage_title: "genuine",
        subtitle_1: "Definition",
        definitions:  ["real, honest, something that is what is seems to be"],
        subtitle_2: "Examples",
        example_imgs: "",
        examples: ["He is genuinely interested in his work.", "She shows a genuine concern for her students.", "This document is not genuine."],
        subtitle_3: "Translation",
        translations: "誠実な, 本物",
    },
    {type: "vocabulary_page",
        lesson_title: "School Presentation",
        section_title: "Vocabulary",
        passage_title: "admire",
        subtitle_1: "Definition",
        definitions:  ["to respect or look up to someone, to appreciate the beauty of something"],
        subtitle_2: "Examples",
        example_imgs: "",
        examples: ["I admire his courage.", "He was admired by many for his volunteer work throughout the community.", "From the top of the mountain we admired the view."],
        subtitle_3: "Translation",
        translations: "賞賛,  敬服",
    },
    {type: "vocabulary_page",
        lesson_title: "School Presentation",
        section_title: "Vocabulary",
        passage_title: "break_the_ice",
        subtitle_1: "Definition",
        definitions:  ["to say or do something that makes people feel more relaxed, especially at the beginning of a meeting, party, etc."],
        subtitle_2: "Examples",
        example_imgs: "",
        examples: ["He organized a few party games to break the ice when people first arrived.", "I like tell a joke when I introduce myself as a way to break the ice.", "Everyone was so quiet at first, until finally the host broke the ice and introduced everyone.",],
        subtitle_3: "Translation",
        translations: "緊張(きんちょう)をほぐす, 場(ば)の雰囲気(ふんいき)を和ませる, 場を打ち解けさせる",
    },

    {type: "vocabulary_page",
        lesson_title: "School Presentation",
        section_title: "Vocabulary",
        passage_title: "grounded",
        subtitle_1: "Definition",
        definitions:  ["having a sensible and realistic attitude to life, not overly emotional, collected"],
        subtitle_2: "Examples",
        example_imgs: "",
        examples: ["Meditation helps me feel grounded when life gets busy." ,"Even after winning the money, he stayed grounded and humble.", "My boss is a very grounded person.  He makes the office a low stress environment and never requests us to do anything unreasonable.",],
        subtitle_3: "Translation",
        translations: "しっかりした人, 落ち着いている, 地に足の着いた, 心が落ち着く",
    },
    {type: "vocabulary_page",
        lesson_title: "School Presentation",
        section_title: "Vocabulary",
        passage_title: "compassionate",
        subtitle_1: "Definition",
        definitions:  ["feeling or showing sympathy for people or animals especially who are suffering"],
        subtitle_2: "Examples",
        example_imgs: "",
        examples: ["Politicians are not usually regarded as warm or compassionate people.", "His compassionate words comforted me during a difficult time."],
        subtitle_3: "Translation",
        translations: "思いやりのある, 情け深い",
    },
    {type: "vocabulary_page",
        lesson_title: "School Presentation",
        section_title: "Vocabulary",
        passage_title: "bond",
        subtitle_1: "Definition",
        definitions:  ["an interest, experience, or feeling that makes two people feel connected, to develop a strong relationship with another person"],
        subtitle_2: "Examples",
        example_imgs: "",
        examples: ["A love of music created a bond between them.", "Physical contact helps a mother bond with her baby.",],
        subtitle_3: "Translation",
        translations: "絆, 結びつく, 親しむ",
    },
    {type: "story",
     page: "Story",
        lesson_title: "School Presentation",
        section_title: "Story",
        instructions:["Please enjoy the story. Focus on the new words you just learned.",  "Remember you can click on any word to look it up in an English Dictionary or translate it!"],
        story_text: ["I’m a bit nervous as we walk up to the front door.  My fiancé and I have just arrived at his parents’ house for dinner.  I will be meeting his parents for the first time.", "I know it’s normal to be a little anxious in this situation, but I’m particularly concerned about my English ability.  I hope tonight isn’t filled with awkward silences and embarrassing misunderstandings.", "\”We’re here,\” my fiancé says as he opens the front door.  His father comes to greet us.", "\”Come on in,\” he says as he gives his son a hug.  \”It’s so nice to finally meet you,\” he says to me and then gives me a big hug.", "We just met and we are hugging already.  Although it is awkward it’s one way to break the ice, I guess.", "My fiancé’s mom comes to greet us as well. “Thank you so much for coming,” she says as she gives me a hug.", "\”She’s beautiful,\” she says to her son. \”Yes, thank you mom,\” my fiancé replies.", "/”Come on in and take a seat.  Dinner is ready,\” my fiancé’s mom says.", "We walk into the dining room and take a seat.  The table has been set already.  My fiancé’s mother comes out of the kitchen with a large pot that is steaming hot.", "\”What do you want to drink?\” my fiancé’s dad asks us. \”I’ll have a soda,\” my fiancé replies.  \”We have beer and wine,\” his dad replies.", "\”It’s alright.  I have to drive home,\” my fiancé explains. \”I’ve always admired your self-control, son,\” his mom says.", "\”I’ll have a glass of wine,\” I say.  \”Oh good, I’m glad I don’t have to drink alone,\” his dad replies with a smile.", "As we begin to eat, my fiancé’s mom asks me \”So what brought you two together?", "\”Mom, that’s a deep question to start with.  You don’t want to start with a nice easy question to break the ice first?\” my fiancé quickly responds.", "\”Oh no, it’s fine,\” I say, \”From the first date, he has given me really genuine compliments which I appreciated.\”", "\”I love how grounded she is,\” my fiancé says \”she isn’t overly emotional and makes rational decisions.  She never expects unrealistic things from me.\”", "\”Is there something in particular that you bonded over?\” my fiancé’s dad asks.", "\”We both are really active and enjoy exercise,\” I reply.  \”We go to the gym together and meet up with our friends to play pickleball and badminton,\” my fiancé adds.", "\”I guess there are worse things to bond over,\” my fiancé’s dad replies with a bit of a smirk.", "\”Usually, he is so kind and compassionate, but when we play sports, he can get a little competitive,\” I say.  \”Hey!  You too!\” my fiancé says laughing.", "As the conversation continues, I begin to admire his parents. They are compassionate and can see they have a genuinely healthy relationship and strong bond with each other.  The rest of the night goes so smoothly that I forget why I was even nervous to begin with.",],
    story_audio: ["SA_1.mp3", "SA_2.mp3", "SA_3.mp3", "SA_4.mp3", "SA_5.mp3", "SA_6.mp3", "SA_7.mp3", "SA_8.mp3", "SA_9.mp3", "SA_10.mp3"]
    },
    {type: "review",
     page: "Review_Main_Page",
        lesson_title: "School Presentation",
        passage_title: "Review",
        instructions: ["There are two review exercises.", "We recommended doing one now and then doing the other one on another day in the near future.", ],
        exercise_selection: ["1. Match the vocabulary words to correct translation", "2. Go through the story again and fill in the missing vocabulary words", ],
    },
    {type: "review",
     page: "Review_Matching_Translation_Exercise",
     exercise: "matching_translation",
        lesson_title: "School Presentation",
        section_title: "Review",
        instructions: ["Match the words to the correct translation",],
        vocabulary_wordlist: ["genuine", "admire", "break_the_ice", "grounded", "compassionate", "bond"],
    },
    {type: "review",
     page: "Review_Fill-in-the-blank_Story_Exercise",
     exercise: "cloze_story",
        lesson_title: "School Presentation",
        section_title: "Review",
        instructions: ["Fill in the blank with the correct vocabulary word", ],
        story_text: ["I’m a bit nervous as we walk up to the front door.  My fiancé and I have just arrived at his parents’ house for dinner.  I will be meeting his parents for the first time.", "I know it’s normal to be a little anxious in this situation, but I’m particularly concerned about my English ability.  I hope tonight isn’t filled with awkward silences and embarrassing misunderstandings.", "\”We’re here,\” my fiancé says as he opens the front door.  His father comes to greet us.", "\”Come on in,\” he says as he gives his son a hug.  \”It’s so nice to finally meet you,\” he says to me and then gives me a big hug.", "We just met and we are hugging already.  Although it is awkward it’s one way to break the ice, I guess.", "My fiancé’s mom comes to greet us as well. “Thank you so much for coming,” she says as she gives me a hug.", "\”She’s beautiful,\” she says to her son. \”Yes, thank you mom,\” my fiancé replies.", "/”Come on in and take a seat.  Dinner is ready,\” my fiancé’s mom says.", "We walk into the dining room and take a seat.  The table has been set already.  My fiancé’s mother comes out of the kitchen with a large pot that is steaming hot.", "\”What do you want to drink?\” my fiancé’s dad asks us. \”I’ll have a soda,\” my fiancé replies.  \”We have beer and wine,\” his dad replies.", "\”It’s alright.  I have to drive home,\” my fiancé explains. \”I’ve always admired your self-control, son,\” his mom says.", "\”I’ll have a glass of wine,\” I say.  \”Oh good, I’m glad I don’t have to drink alone,\” his dad replies with a smile.", "As we begin to eat, my fiancé’s mom asks me \”So what brought you two together?", "\”Mom, that’s a deep question to start with.  You don’t want to start with a nice easy question to break the ice first?\” my fiancé quickly responds.", "\”Oh no, it’s fine,\” I say, \”From the first date, he has given me really genuine compliments which I appreciated.\”", "\”I love how grounded she is,\” my fiancé says \”she isn’t overly emotional and makes rational decisions.  She never expects unrealistic things from me.\”", "\”Is there something in particular that you bonded over?\” my fiancé’s dad asks.", "\”We both are really active and enjoy exercise,\” I reply.  \”We go to the gym together and meet up with our friends to play pickleball and badminton,\” my fiancé adds.", "\”I guess there are worse things to bond over,\” my fiancé’s dad replies with a bit of a smirk.", "\”Usually, he is so kind and compassionate, but when we play sports, he can get a little competitive,\” I say.  \”Hey!  You too!\” my fiancé says laughing.", "As the conversation continues, I begin to admire his parents. They are compassionate and can see they have a genuinely healthy relationship and strong bond with each other.  The rest of the night goes so smoothly that I forget why I was even nervous to begin with.",],
        vocabulary_wordlist: ["genuine", "admire", "break_the_ice", "grounded", "compassionate", "bond"],
        review_button: "Check Answers",
    },
    {type: "practice",
     page: "Practice_Main_Page",
        lesson_title: "School Presentation",
        passage_title: "Practice",
        instructions: ["Now we have 4 exercises to practice using the vocabulary.", ],
        exercise_selection: ["1. Fill in the blank in an example sentence", "2. Build your own sentence", "3. Read a new story and fill in the missing words.", "4. Spell the words."],
    },
    {type: "practice",
     page: "Practice_Fill-in-the-blank_Example_Sentence_Exercise",
     exercise: "cloze_example",
        lesson_title: "School Presentation",
        section_title: "Practice",
        instructions: ["Match the words to the correct translation",],
        example_sentences: ["He was relieved that he finished on time.", "You could tell by his poor posture that he was nervous.", "We made eye_contact and said hello.", "The audience waited quielty for the show to start.", "The presentation was boring becasue I couldn't hear the speaker."],
        vocabulary_wordlist: ["genuine", "admire", "break_the_ice", "grounded", "compassionate", "bond"],
        review_button: "Check Answers",
    },
    {type: "practice",
     page: "Practice_Make_Your_Own_Sentence_Exercise",
     exercise: "sentence_builder",
        lesson_title: "Introducing Yourself at School",
        section_title: "Practice",
        instructions: ["",],
        sentence_starters_word_1: "presentaion",
        sentence_starters_1: ["The presentation was about BLANK .", "The presentation was BLANK .", ],
        sentence_starters_word_2: "relieved",
        sentence_starters_2: ["I am relieved that BLANK .", ],
    vocabulary_wordlist: ["genuine", "admire", "break_the_ice", "grounded", "compassionate", "bond"],
         review_button: "Check Answers",
    },
    {type: "practice",
     page: "Practice_Fill-in-the-blank_New_Story_Exercise",
     exercise: "cloze_new_story",
        lesson_title: "School Presentation",
        section_title: "Practice",
        instructions: ["",],
        new_story_text: ["\“Good morning class. Today we will be talking about how to give a good presentation,\” the teacher says at the beginning of the lesson.",  "\“First let’s watch this short video that shows some famous speakers.  Please watch closely to what they do while speaking.\”", "The teacher starts the video.  The video shows someone speaking for about a minute then changes to a new person.  I know a couple of the people in the video.", "The video finishes and the teacher asks, \“what did you notice about the people speaking?\”", "The teacher calls on someone raising their hand.  \“They all had nice clothes on,\” the student says.", "\“Good, what else Michael?\” the teacher asks another student.", "\“They all spoke slowly, loudly and clearly,\” says Michael.", "\“It was very easy to hear them, wasn’t it?\” the teacher continues to another student.", "\“They were standing straight and not moving around too much,\” the student says.", "\“Great, when someone stands up nice and straight, we can say they have good posture,\” the teacher continues. ", "\“When you have good posture, you look comfortable instead of looking nervous.  Where were the speakers looking when they spoke?\”", "\“They were looking at the audience or at the camera,\” someone responds.", "\“Yes, we won’t have a camera when we give our presentations, but it is important to look at your audience and make eye contact with the people listening,\” the teacher says.", "\“Some of you look nervous already,\” the teacher says. \“Being able to give a good speech or presentation is an important skill to have.\”", "\“What will our presentations be about?\” asks a student.", "\“I think you will be relieved because it is not something difficult. You will present about the book you choose to read this year,\” the teacher says.", "I am relieved.  It should be easy to tell everyone about the book I read.",],
    vocabulary_wordlist: ["genuine", "admire", "break_the_ice", "grounded", "compassionate", "bond"],
        review_button: "Check Answers",
    },
    {type: "practice",
     page: "Practice_Spelling_Exercise",
     exercise: "spelling",
        lesson_title: "School Presentation",
        section_title: "Practice",
        instructions: ["",],
        review_button: "Check Answers",
    audio_tags: ["./public/audio/presentation.mp3", "./public/audio/relieved.mp3", "./public/audio/nervous.mp3", "./public/audio/posture.mp3", "./public/audio/audience.mp3", "./public/audio/eye_contact.mp3",],
    vocabulary_wordlist: ["genuine", "admire", "break_the_ice", "grounded", "compassionate", "bond"],
    },
    {type: "ending_page",
      lesson_title: "School Presentation",
      ending_page_img: "",
      instructions: ["Great work!", "It's ok if you didn't do all the exercises today.", "We recommend revisiting the review and practice exercises in a few days regardless."]
    },
];


const PassageArray = PassageArray_raw.map((passage) => {
  let updatedPassage = { ...passage };

  // Dynamically generate the `page` property for vocabulary pages
  if (passage.type === "vocabulary_page" && 
      passage.passage_title &&
      passage.page !== "Vocabulary_Main_Page") {
    updatedPassage.page = `Vocabulary: ${passage.subtitle} ${passage.passage_title}`;
  }

  // Adjust audio paths based on the environment
  if (passage.audio_tags) {
    if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      console.log("Not running locally (e.g., production or GitHub Pages)");
      const basePath = "/Practice_3"; // Replace with your GitHub repository name or use an environment variable
      updatedPassage.audio_tags = passage.audio_tags.map((audio) =>
        `${basePath}/audio/${audio.split('/').pop()}` // Extract the file name and prepend the base path
      );
    } else {
      console.log("Running locally");
      updatedPassage.audio_tags = passage.audio_tags.map((audio) =>
        `./audio/${audio.split('/').pop()}` // Ensure the path points to the correct location in the public folder
      );
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("Final audio paths:", updatedPassage.audio_tags);
  }

  return updatedPassage;
});

export default PassageArray;