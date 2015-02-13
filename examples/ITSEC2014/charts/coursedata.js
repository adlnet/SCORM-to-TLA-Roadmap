window.CourseData = (function () {
    if (! ADL.verbs ) throw new Error("You need to include the ADL.verbs");
    var stmts = [],
        activity = { 
            profiles : {},
            getprofile : function (user, obj) {
                if ( this.profiles[user] ) return this.profiles[user][obj] || {};
                return {};
            },
            setattempt : function (user, obj, atturi) {
                var up = this.profiles[user] || {};
                var uap = up[obj] || { attempts:[] };
                uap.attempts.push(atturi);
                up[obj] = uap;
                this.profiles[user] = up;
            }
        },
//        twowksago = new Date(+new Date - 12096e5),
        today = new Date(),
        monthago = new Date().setMonth(today.getMonth() -1),
        questions = [
            {"id": "http://adlnet.gov/courses/roses/q1"},
            {"id": "http://adlnet.gov/courses/roses/q2"},
            {"id": "http://adlnet.gov/courses/roses/q3"},
            {"id": "http://adlnet.gov/courses/roses/q4"}
        ],
        q2objs = [
            [0],
            [1,2,3],
            [4],
            [5,6]
        ],
        objs = [
            {
                "id": "http://adlnet.gov/courses/roses/what",
                "definition": {
                    "name": {
                        "en-US": "What is a Rose"
                    },
                    "description": {
                        "en-US": "Roses Job Aid - What is a rose"
                    }
                }
            },
            {
                "id": "http://adlnet.gov/courses/roses/pruning",
                "definition": {
                    "name": {
                        "en-US": "Rose Pruning"
                    },
                    "description": {
                        "en-US": "Roses Job Aid - Pruning"
                    }
                }
            },
            {
                "id": "http://adlnet.gov/courses/roses/deadheading",
                "definition": {
                    "name": {
                        "en-US": "Rose Dead Heading"
                    },
                    "description": {
                        "en-US": "Roses Job Aid - Dead Heading"
                    }
                }
            },
            {
                "id": "http://adlnet.gov/courses/roses/shearing",
                "definition": {
                    "name": {
                        "en-US": "Rose Shearing"
                    },
                    "description": {
                        "en-US": "Roses Job Aid - Shearing"
                    }
                }
            },
            {
                "id": "http://adlnet.gov/courses/roses/hybrids",
                "definition": {
                    "name": {
                        "en-US": "Rose Hybrids"
                    },
                    "description": {
                        "en-US": "Roses Job Aid - Hybrids"
                    }
                }
            },
            {
                "id": "http://adlnet.gov/courses/roses/styles",
                "definition": {
                    "name": {
                        "en-US": "Rose Styles"
                    },
                    "description": {
                        "en-US": "Roses Job Aid - Styles"
                    }
                }
            },
            {
                "id": "http://adlnet.gov/courses/roses/symbolism",
                "definition": {
                    "name": {
                        "en-US": "Rose Symbolism"
                    },
                    "description": {
                        "en-US": "Roses Job Aid - Symbolism"
                    }
                }
            }
        ],
        interactions = [
            {
                "correct": "a",
                "wrong": ["b","c","d"],
                "object" : {
                    "id": "http://www.adlnet.gov/courses/roses/posttest/interaction/urn%3Aadl_roses_q1",
                    "definition": {
                        "description": {
                            "en-US": "What is the correct genus for roses?"
                        }
                    }
                }
            },
            {
                "correct": "c",
                "wrong": ["a","b","d"],
                "object" : {
                    "id": "http://www.adlnet.gov/courses/roses/posttest/interaction/urn%3Aadl_roses_q2",
                    "definition": {
                        "description": {
                            "en-US": "Which statement is true about the purpose of pruning?"
                        }
                    }
                }
            },
            {
                "correct": "c",
                "wrong": ["a","b","d"],
                "object" : {
                    "id": "http://www.adlnet.gov/courses/roses/posttest/interaction/urn%3Aadl_roses_q3",
                    "definition": {
                        "description": {
                            "en-US": "Which is true about hybrid tea roses?"
                        }
                    }
                }
            },
            {
                "correct": "a",
                "wrong": ["b","c","d"],
                "object" : {
                    "id": "http://www.adlnet.gov/courses/roses/posttest/interaction/urn%3Aadl_roses_q4",
                    "definition": {
                        "description": {
                            "en-US": "Which color is correctly matched with its rose color symbolism?"
                        }
                    }
                }
            }
        ],
        posttest = {
            "id": "http://adlnet.gov/courses/roses/posttest",
            "objectType": "Activity"
        },
        peeps = [
            {"name":"bob", "account":{"homePage":"http://cloud.scorm.com","name":"bob@example.com"}},
            {"name":"mary", "account":{"homePage":"http://cloud.scorm.com","name":"mary@example.com"}},
            {"name":"vince", "account":{"homePage":"http://cloud.scorm.com","name":"vince@example.com"}},
            {"name":"alice", "account":{"homePage":"http://cloud.scorm.com","name":"alice@example.com"}},
            {"name":"nick", "account":{"homePage":"http://cloud.scorm.com","name":"nick@example.com"}},
            {"name":"hershel", "account":{"homePage":"http://cloud.scorm.com","name":"hershel@example.com"}},
            {"name":"roy", "account":{"homePage":"http://cloud.scorm.com","name":"roy@example.com"}},
            {"name":"alex", "account":{"homePage":"http://cloud.scorm.com","name":"alex@example.com"}},
            {"name":"camille", "account":{"homePage":"http://cloud.scorm.com","name":"camile@example.com"}},
            {"name":"sasha", "account":{"homePage":"http://cloud.scorm.com","name":"sasha@example.com"}},
            {"name":"chad", "account":{"homePage":"http://cloud.scorm.com","name":"chad@example.com"}},
            {"name":"thomas", "account":{"homePage":"http://cloud.scorm.com","name":"thomas@example.com"}},
            {"name":"michael", "account":{"homePage":"http://cloud.scorm.com","name":"michael@example.com"}},
            {"name":"violet", "account":{"homePage":"http://cloud.scorm.com","name":"violet@example.com"}},
            {"name":"owen", "account":{"homePage":"http://cloud.scorm.com","name":"owen@example.com"}},
            {"name":"george", "account":{"homePage":"http://cloud.scorm.com","name":"george@example.com"}},
            {"name":"persephone", "account":{"homePage":"http://cloud.scorm.com","name":"persephone@example.com"}},
            {"name":"jill", "account":{"homePage":"http://cloud.scorm.com","name":"jill@example.com"}},
            {"name":"will", "account":{"homePage":"http://cloud.scorm.com","name":"will@example.com"}},
            {"name":"luke", "account":{"homePage":"http://cloud.scorm.com","name":"luke@example.com"}}
        ],
        tmpl = {
            "id": "",
            "version": "1.0.1",
            "stored": "",
            "timestamp": "",
            "actor": {},
            "verb": {},
            "object": {},
            "context": {
                "contextActivities": {
                    "parent": [
                        { "id": "http://adlnet.gov/courses/roses" }
                    ],
                    "grouping": [
                        { "id": "" }
                    ]
                }
            }
        }, 
        courseattcount = 0;
    
    // for the students
    for (var i = 0; i < peeps.length; i++) {
        createFullCourseAttemptStmts(peeps[i], monthago);
    }
    
    function createFullCourseAttemptStmts(peep, starttime) {
        courseattcount++;
        var attguid = ruuid();        
//        var starttime = randomDate(twowksago, today);
        var todo = [];
        var termtime = new Date(+starttime + 1000 * getRandomInt(0, 3600));
        
        for (var i = 0; i < questions.length; i++) {
            var ret = reportTest(peep, attguid, starttime, questions[i], Math.round(Math.random()));
                
            if (! ret.porf) todo.push(i);
        }
        
        var coursetime = new Date(+starttime + 1000 * 3600 * 60);
        for (var i = 0; i < todo.length; i++) {
            for (var w = 0; w < q2objs[todo[i]].length; w++ ) {
                var course = objs[q2objs[todo[i]][w]];
                attguid = ruuid();
                starttime = ret.termtime || termtime;
                var comptime = new Date(+starttime + 1000 * getRandomInt(0, 3600));
                termtime = new Date(+comptime + 1000 * getRandomInt(0, 3600));
                coursetime = new Date(+termtime + 1000 * getRandomInt(0, 3600));
                stmts.push(createInitialzed(peep, attguid, starttime, course));
                stmts.push(createCompleted(peep, attguid, comptime, course));
                stmts.push(createTerminated(peep, attguid, termtime, course));
            }
        }
        
        var range = [0, .25, .5, .75, 1]
        var totalright = getRandomInt(0,range.length);
        var finalscore = range[totalright];
        reportTest(peep, ruuid(), coursetime, posttest, finalscore, true, totalright);
        
        if (finalscore < .75) 
            createFullCourseAttemptStmts(peep, coursetime);
    }
    
    function reportTest(peep, attguid, starttime, question, score, posttest, totalright) {
        var porf = score >= .75,
            itrtime = (posttest)? new Date(+starttime + 1000 * getRandomInt(0, 3600)):starttime,
            porftime = new Date(+itrtime + 1000 * getRandomInt(0, 3600)),
            scoredtime = new Date(+porftime + 1000 * getRandomInt(0, 3600)),
            comptime = new Date(+scoredtime + 1000 * getRandomInt(0, 3600)),
            termtime = new Date(+comptime + 1000 * getRandomInt(0, 3600));
        
        stmts.push(createInitialzed(peep, attguid, starttime, question));
        if (posttest) createInteractions(peep, attguid, starttime, question, score, totalright);
        stmts.push(createPorF(peep, attguid, porftime, question, (porf)?ADL.verbs.passed:ADL.verbs.failed));
        stmts.push(createScored(peep, attguid, scoredtime, question, score));
        stmts.push(createCompleted(peep, attguid, comptime, question));
        stmts.push(createTerminated(peep, attguid, termtime, question));
        
        return {porf: porf, termtime: termtime};
    }
    
    function createInteractions(peep, attguid, starttime, question, score, totalright) {
        var itrs = JSON.parse(JSON.stringify(interactions)),
            idxarr = [0,1,2,3];
        for (var i = 0; i < totalright; i++) {
            var loc = getRandomInt(0, idxarr.length);
            itrs[idxarr[loc]]["passed"] = true;
            idxarr.splice(loc, 1);
        }
        
        var ts = new Date(+starttime + 1000 * getRandomInt(0, 900))
        for (var idx in itrs) {
            
            var st = createStmt(peep, 
                                  attguid, 
                                  ts,
                                  question,
                                  ADL.verbs.responded,
                                  (itrs[idx].passed)?itrs[idx].correct:itrs[idx].wrong[getRandomInt(0,itrs[idx].wrong.length)]);
            st.context.contextActivities.parent.push(question);
            st.object = interactions[idx].object;
            stmts.push(st);
            ts = new Date(+ts + 1000 * getRandomInt(0, 900));
        }
                                  
         
    }
    
    function createInitialzed (peep, attguid, starttime, obj) {
        activity.setattempt(peep.account.name, obj.id, obj.id + "?attemptId=" + attguid);
        return createStmt(peep, attguid, starttime, obj, ADL.verbs.initialized);
    }
    
    function createPorF (peep, attguid, scoredtime, obj, verb) {
        return createStmt(peep, attguid, scoredtime, obj, verb);
    }
    
    function createScored (peep, attguid, scoredtime, obj, score) {
        return createStmt(peep, attguid, scoredtime, obj, ADL.verbs.scored, score);
    }
    
    function createCompleted (peep, attguid, starttime, obj) {
        return createStmt(peep, attguid, starttime, obj, ADL.verbs.completed);
    }
    
    function createTerminated (peep, attguid, starttime, obj) {
        return createStmt(peep, attguid, starttime, obj, ADL.verbs.terminated);
    }
    
    function createStmt(peep, attguid, ts, obj, verb, score) {
        //http://adlnet.gov/jobaid/roses/colors?attemptId=e1d2cc4b-3ce5-4c10-b712-8aca8bbe98db
        var s = JSON.parse(JSON.stringify(tmpl));
        s.id = ruuid();
        s.stored = new Date(+ts + 1000 * getRandomInt(0, 60));
        s.timestamp = ts;
        s.actor = peep;
        s.object = obj;
        s.context.contextActivities.grouping[0].id = obj.id + "?attemptId=" + attguid;
        s.verb = verb;
        if (verb.id == ADL.verbs.scored.id) {   
            s.result = {
                score: { scaled: score}
            };
        } else if (verb.id == ADL.verbs.responded.id) {
            s.result = { response: score };
        }
        
        return s;
    }
        
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    function ruuid() 
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
        });
    }
    
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    
    function orderByTimestamp(stmts) {
        stmts.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        return stmts;
    }

    console.log("course attempt count: " + courseattcount);
    
    return {statements: orderByTimestamp(stmts), activityprofiles: activity};
}());