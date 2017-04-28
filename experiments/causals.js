function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function startsWith(str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
       var substring = substrings[i];
       if (str.indexOf(substring) == 0) {
         return 1;
       }
    }
    return -1;     
}

function advanceWord(word_id) {
  //$(".sprword").hide();
  $(".sprword").css('visibility','hidden');
  //$("#"+word_id).show();
  $("#"+word_id).css('visibility','visible');
  exp.word_start = Date.now();
  console.log("got in here "+word_id);
}

function make_slides(f) {
  var slides = {};

  slides.i0 = slide({
     name : "i0",
     //record time experiment started
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    start: function() {
      //$(".err").hide();
      //rewrite total-num in html with variable exp.nTrials (equals 4 later)
      $("#total-num").html(exp.nTrials);
     },
    button : function() {
      //go to the next trial when they click a button
        exp.go();
    }
  });

  slides.practice_task = slide({
    name : "practice_task",
    present : exp.practice_stims,
    start : function() {
       $(".practice_err").hide();
       $('input[name="tf"]').prop('checked',false);
      },
    present_handle : function(stim) {
      console.log(stim);
      $(".practice_err").hide();
      $("#practice_question").hide();
      $("#practice_truefalse").hide();
      $("#practice_advancebutton").hide();
      this.trial_start = Date.now();
      exp.word_counter = 0;
      _s.rts = [];
      this.stim = stim;

     var practice_sentence = stim.statements;
        var practice_sentencehtml = "<p>";
        for (i=0;i<practice_sentence.length;i++) {
          if (i>0) {
            practice_sentencehtml = practice_sentencehtml + '<span id="w'+(i+1)+'" class="sprword">'+this.stim.pronoun+practice_sentence[i]+'</span>';
          } else {
            practice_sentencehtml = practice_sentencehtml + '<span id="w'+(i+1)+'" class="sprword">'+practice_sentence[i]+'</span>';
          }
        }

        practice_sentencehtml = practice_sentencehtml + "</p>";
        $("#practice_sentence").html(practice_sentencehtml);
        console.log("practice_sentencehtml");
        console.log(practice_sentencehtml);
        $("#practice_question").html(this.stim.question);

        document.body.onkeyup = function(e){
          if(e.keyCode == 32){
            exp.word_counter++;
            if (exp.word_counter <= stim.statements.length) {
              advanceWord("w"+exp.word_counter);
            } else {
              $(".sprword").hide();
              $('input[id=yes]').attr('checked',false);
              $('input[id=no]').attr('checked',false);
              $("#practice_truefalse").show();
              $("#practice_question").show();
              $("#practice_advancebutton").show();
            }
          }
        }   
      },
      button : function() {
        var ok_to_go_on = true;
        if ($('input[name="tf"]:checked').val() == undefined) {
          ok_to_go_on = false;
          $(".practice_err").show();
        } else {
          _stream.apply(this);
      }
    }
  });

  slides.start_screen = slide ({
    name : "start_screen",
    start: function() {
      //$(".err").hide();
      //rewrite total-num in html with variable exp.nTrials (equals 4 later)
      $("#total-num").html(exp.nTrials);
    },
    button : function() {
       //go to the next trial when they click a button
       exp.go();
      }
  });

  slides.sprtrial = slide({
      name : "sprtrial",
      present : exp.all_stims,
      start : function() {
       $(".trial_err").hide();
       $('input[name="tf"]').prop('checked',false);
      },
      present_handle : function(stim) {
        console.log(stim);
        $(".trial_err").hide();
        $("#trial_question").hide();
        $("#trial_truefalse").hide();
        $("#trial_advancebutton").hide();
        this.trial_start = Date.now();
        exp.word_counter = 0;
        _s.rts = [];
        this.stim = stim;

        var trial_sentence = stim.statements;
        var trial_sentencehtml = "<p>";
        for (i=0;i<trial_sentence.length;i++) {
          if (i>0) {
            trial_sentencehtml = trial_sentencehtml + '<span id="w'+(i+1)+'" class="sprword">'+this.stim.pronoun+trial_sentence[i]+'</span>';
          } else {
            trial_sentencehtml = trial_sentencehtml + '<span id="w'+(i+1)+'" class="sprword">'+trial_sentence[i]+'</span>';
          }
        }

        trial_sentencehtml = trial_sentencehtml + "</p>";
        $("#trial_sentence").html(trial_sentencehtml);
        console.log("trial_sentencehtml");
        console.log(trial_sentencehtml);
        $("#trial_question").html(this.stim.question);

        document.body.onkeyup = function(e){
          if(e.keyCode == 32){
            _s.rts.push(Date.now()-exp.word_start);
            exp.word_counter++;
            if (exp.word_counter <= stim.statements.length) {
              advanceWord("w"+exp.word_counter);
            } else {
              $(".sprword").hide();
              $('input[id=yes]').attr('checked',false);
              $('input[id=no]').attr('checked',false);
              $("#trial_truefalse").show();
              $("#trial_question").show();
              $("#trial_advancebutton").show();
            }
          }
        }
      },
      button : function() {
        var ok_to_go_on = true;
        if ($('input[name="tf"]:checked').val() == undefined) {
          ok_to_go_on = false;
          $(".trial_err").show();
        } else {
          this.log_responses();
          _stream.apply(this);
      }
    }, 
      log_responses : function() {
          exp.data_trials.push({
            "profession" : this.stim.profession,
            "pronoun" : this.stim.pronoun,
            "slide_number_in_experiment" : exp.phase,
            "statements": this.stim.statements,
            "question": this.stim.question,
            "correctResponse": this.stim.correctResponse,
            "rt" : Date.now() - _s.trial_start,
            "weight" : this.stim.weight,
            "response" : _s.rts.concat($('input[name="tf"]:checked').val())
          });
      }
    });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val(),
        comments : $("#comments").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {

  // repeatWorker = false;
  // (function(){
  //     var ut_id = "mht-causals-20170222";
  //     if (UTWorkerLimitReached(ut_id)) {
  //       $('.slide').empty();
  //       repeatWorker = true;
  //       alert("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
  //     }
  // })();

  exp.trials = [];
  exp.catch_trials = [];
  exp.all_stims = [];
  exp.practice_stims = [{
    profession: "novelist",
    statement1: "The novelist went to a coffee shop to write.",
    statement2: " procrastinated for an hour before writing half a chapter.",
    statements: ["The novelist went to a coffee shop to write.", " procrastinated for an hour before writing half a chapter."],
    question: "Did the novelist get a whole chapter done?",
    correctResponse: "No",
    pronoun: "He"
  },
  {
    profession: "news anchor",
    statement1: "The news anchor delivered the homicide report.",
    statement2: " felt disturbed by the tragic nature of the news she was reading.",
    statements: ["The news anchor delivered the homicide report.", " felt perturbed by the tragic nature of the news she was reading."],
    question: "Did the news anchor feel disturbed?",
    correctResponse: "yes",
    pronoun: "She"
  },
  {
    profession: "opera singer",
    statement1: "The opera singer belted a high C.",
    statement2: " was heartened when the audience rose to their feet.",
    statements: ["The opera singer belted a high C.", " was heartened when the audience rose to their feet."],
    question: "Did the news anchor belt a high D?",
    correctResponse: "No",
    pronoun: "She"
  }
  ];




  // // exp.condition = _.sample(["prior","speaker","speaker","speaker","speaker","listener"])
  // exp.condition = "speaker"
  exp.nTrials = maleSet.length + neutralSet.length + femaleSet.length;

  var shuffledMale = _.shuffle(maleSet);
  var shuffledNeutral = _.shuffle(neutralSet);
  var shuffledFemale = _.shuffle(femaleSet);



  // exp.stims = [];
  // var shuffledDists = _.shuffle(distributions);
  // var frequencies = _.shuffle(tasks.speaker.frequencies);
  // var labels = _.shuffle(creatureNames);
  // var planets = _.shuffle(["X137","A325","Z142","Q681"])

  for (var i=0; i<maleSet.length; i++) {
      var pronoun = "He";
      if (i > 4) {
        pronoun = "She";
      }
      var fM = {
        profession: shuffledMale[i].profession,
        statement1: shuffledMale[i].statement1,
        statement2: shuffledMale[i].statement2,
        statements: shuffledMale[i].statements,
        question: shuffledMale[i].question,
        correctResponse: shuffledMale[i].correctResponse,
        weight: shuffledMale[i].weight,
        pronoun: pronoun
      };
      var fN = {
        profession: shuffledNeutral[i].profession,
        statement1: shuffledNeutral[i].statement1,
        statement2: shuffledNeutral[i].statement2,
        statements: shuffledNeutral[i].statements,
        question: shuffledNeutral[i].question,
        correctResponse: shuffledNeutral[i].correctResponse,
        weight: shuffledNeutral[i].weight,
        pronoun: pronoun
      };
      var fF = {
        profession: shuffledFemale[i].profession,
        statement1: shuffledFemale[i].statement1,
        statement2: shuffledFemale[i].statement2,
        statements: shuffledFemale[i].statements,
        question: shuffledFemale[i].question,
        correctResponse: shuffledFemale[i].correctResponse,
        weight: shuffledFemale[i].weight,
        pronoun: pronoun
      };
      exp.all_stims.push(fM);
      exp.all_stims.push(fN);
      exp.all_stims.push(fF);
    }

  exp.all_stims = _.shuffle(exp.all_stims);

  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };

  //blocks of the experiment:
   exp.structure=[
     "i0",
     "instructions",
     "practice_task",
     "start_screen",
     "sprtrial",
     "subj_info",
     "thanks"
   ];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}