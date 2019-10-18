'use strict'
$(document).ready(() => {
        $('#videoWin').hide();

        var x = document.getElementById("myAudio"); 

        function playAudio() { 
            x.play(); 
    } 
        function pauseAudio() { 
            x.pause(); 
    } 

        let i = 0;
        let j = 0;
        let speed = 80;

        const txt = 'So Welcome to Izzys Literary Trivia Game, so the game are timed questions about quotes from literary figures, guess who said it.....';  
        
        const txt2 = 'What literary figure said the following quote? ..  "Yes, but in the case of the writer, or in the case of every artist, we have the duty for the most part, happy duty, of transforming everything into symbols. Those symbols can be colors, shapes, sounds. In the case of the poet, they are sounds but also words... Also fables, tales, poems. What I mean is that the work of the poet is endless. Its not about working from one hour to another. You are constantly receiving something from the outer world. It all has to be transformed; it eventually has to be changed. And in any moment a revelation may come. That is to say, that the poet never rests. He is working constantly, when he dreams too..."'; 
    
        function introGame(e) {
        if (i < txt.length) {
                document.getElementById("results").innerHTML += txt.charAt(i); i++; 
                setTimeout(introGame, speed, e); 
                $('#videoWin').delay(11900).fadeIn('slow'); 
                playAudio();
                //Syncing video to intro and quote is 11700 at the 80 speed.//   
                $("#results").delay(11700).hide(emptyResults); 
            }
        } 

        function emptyResults (e) { 
        $('#results').empty(e).delay(12000); 
        $("#results").show(e); 
        }

        $('#ReadButton').click(function startGame (e) { 
            if (j < txt2.length) {
                document.getElementById("results").innerHTML += txt2.charAt(j); j++; 
                setTimeout(startGame, speed, e); 
                playAudio();
            }
        });

    introGame(emptyResults); 
    M.AutoInit(); 


    var i = 0;
    var correctAnswers;
    var incorrectAnswers;
    var noAnswer;
    var counter = 20;
    var countDown; 
    
    
    $('#start-button').on('click', function(){
        $("#top-buttons").hide();
        $("#start-game").hide();
        $(".timer").show();
        gameFunction();
        timer();
        correctAnswers = 0;
        incorrectAnswers = 0;
        noAnswer = 0;
    });

    function gameFunction() {
        $(".question").html("<p class='question-text'>" + literaryQuestions[i].question + "</p>");
        answerInput = "<p class='answerChoice'>" + literaryQuestions[i].answerChoices[0] + "</p><p class='answerChoice'>"+ literaryQuestions[i].answerChoices[1] +"</p><p class='answerChoice'>"+ literaryQuestions[i].answerChoices[2] +"</p><p class='answerChoice'>"+ literaryQuestions[i].answerChoices[3] +"</p>";
        $(".answers").html(answerInput);
        
    };

    function timer() {
        $(".timer").show();
        countDown = setInterval(quizCounter, 1000);
        function quizCounter () {
            if (counter === 0) {
                clearInterval(countDown);
                timeoutAnswer();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer-display").html(counter);
        };
    };
    
    function questionAnswered() {
        if (i < 9) {
            i++;	
            console.log("index: " + i);
            gameFunction();
            $(".results").empty();
            $(".timer").show();
            counter = 20;
            timer();
        } 
        else {
            gameOver();
        }
    };
    
    $(".answers").on("click", ".answerChoice", function(event) {
        answerChoice = $(this).text();
        rightAnswer = literaryQuestions[i].answerChoices[literaryQuestions[i].correctAnswer];
        console.log("answerChoice: " + answerChoice);
        console.log("rightAnswer: " + rightAnswer);
        clearInterval(countDown)
        if (answerChoice === rightAnswer) {
            correctAnswer();
        } else if (answerChoice !== rightAnswer) {
            wrongAnswer();
        } 
    });
            
    $('#restart-button').on('click', function(){
        $(this).hide();
        reset();
    });
    
            
    function correctAnswer () {
        correctAnswers++;
        console.log("correctAnswers: " + correctAnswers);
        $(".question").empty();
        $(".timer").hide();
        $(".answers").empty();
        $(".results").html("<p class='answer-message'>Congratulations! That was the correct answer!</p>");
        setTimeout(questionAnswered, 3000);
    };
    
    function wrongAnswer() {
        incorrectAnswers++;
        console.log("incorrectAnswers: " + incorrectAnswers);
        $(".question").empty();
        $(".timer").hide();
        $(".answers").empty();
        $(".results").html("<p class='answer-message'>Sorry, that wasn't right!</p>" + "<p class='correct-message'>The correct answer was </p>" + "<p class ='correct-answer'>" + literaryQuestions[i].answerChoices[literaryQuestions[i].correctAnswer] + ".</p>");
        setTimeout(questionAnswered, 3000);
    };
    
    function timeoutAnswer() {
        noAnswer++;
        console.log("noAnswer:" + noAnswer);
        console.log("correctAnswer: " + correctAnswer);
        $(".question").empty();
        $(".timer").hide();
        $(".answers").empty();
        $(".results").html("<p class='answer-message'>Sorry, time's up!</p>" + "<p class='correct-message'>The correct answer was </p>" + "<p class ='correct-answer'>" + literaryQuestions[i].answerChoices[literaryQuestions[i].correctAnswer] + ".</p>");
        setTimeout(questionAnswered, 3000);
    };
    
    function reset() {
        $(".question").empty();
        $(".timer").hide();
        $(".answers").empty();
        $(".results").empty();
        i = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        noAnswer = 0;
        counter = 20;
        gameFunction();
        timer();
    };
    
    function gameOver() {
        $(".question").empty();
        $(".timer").hide();
        $(".answers").empty();
        $(".results").html("<p class='results'>Your Results:</p>" + "<p class='results'>Correct Answers: " + correctAnswers + "</p>" + "<p class='results'>Wrong Answers: " + incorrectAnswers + "</p>"+ "<p class='results'>Unanswered: " + noAnswer + "</p>");
        $("#restart-button").show();
    };



    // Created the below object of questions from the following site: 
    // https://www.shortlist.com/news/the-40-most-powerful-literary-quotes
    var literaryQuestions = [
        {
        question: "Who wrote: Maybe everbody in the whole damn world is scared of each other.",
        answerChoices: ["W. E. B. Du Bois", "Zora Neale Hurston", "Jorge Luis Borges", "John Steinbeck "],
        correctAnswer: 3,
        answerBook: "Wrote it in the novel Of Mice and Men published in 1937",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-2-1556673308-p13S-column-width-inline.jpg',
    },
    {
        question: "Who wrote: Life is to be lived, not controlled; and humanity is won by continuing to play in face of certain defeat.",
        answerChoices: ["Isaac Asimov", "Ralph Ellison", "Flannery O'Connor", "Kurt Vonnegut"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel Invisible Man published in 1952", imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-3-1556673308-jkGc-column-width-inline.jpg',

    },
    {
        question: "Who wrote: Terror made me cruel",
        answerChoices: ["H. G. Wells", "Charles Dickens", "Emily Brontë", "Joseph Conrad"],
        correctAnswer: 2,
        answerBook: "Wrote it in the novel Wuthering Heights in 1847",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-4-1556673309-PzbM-column-width-inline.png',
    },
    {
        question: "Who wrote: Some men get the world, some men get ex-hookers and a trip to Arizona. You’re in with the former, but my God I don’t envy the blood on your conscience.",
        answerChoices: ["James Ellroy", "Robert Ludlum", "Thomas Pynchon", "Elmore Leonard"],
        correctAnswer: 0,
        answerBook: "Wrote it in the novel L.A. Confidential in 1990",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-42-1556673311-rjTi-column-width-inline.jpg',
    },
    {
        question: "Who wrote: The only people for me are the mad ones, the ones who are mad to live, mad to talk, mad to be saved, desirous of everything at the same time, the ones who never yawn or say a commonplace thing, but burn, burn, burn like fabulous yellow roman candles exploding like spiders across the stars.",
        answerChoices: ["Ayn Rand", "Aldous Huxley ", "Arthur Miller", "Jack Kerouac"],
        correctAnswer: 3,
        answerBook: "Wrote it in the novel On The Road in 1957",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-44-1556673311-0sbs-column-width-inline.jpg',
    },
    {
        question: "Who wrote: It was a bright cold day in April, and the clocks were striking thirteen.",
        answerChoices: ["Robert Frost", "T. S. Eliot", "George Orwell", "Knut Hamsun"],
        correctAnswer: 2,
        answerBook: "Wrote it in the novel 1984 in 1949",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-7-1556673312-SRfw-column-width-inline.png',
    },
    {
        question: "Who wrote: We were the people who were not in the papers. We lived in the blank white spaces at the edges of print. It gave us more freedom. We lived in the gaps between the stories.",
        answerChoices: ["Margaret Atwood", "Don DeLillo", "Doris Lessing",
        "Cormac McCarthy"],
        correctAnswer: 0,
        answerBook: "Wrote it in the novel The Handmaid's Tale in 1985",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-8-1556673314-xmsG-column-width-inline.jpg',
    },
    {
        question: "Who wrote: It sounds plausible enough tonight, but wait until tomorrow. Wait for the common sense of the morning.",
        answerChoices: ["Oscar Wilde", "H.G. Wells", "Henry James", "Leo Tolstoy"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel The Time Machine in 1895",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-45-1556673315-7vfd-column-width-inline.jpg',
    },
    {
        question: "Who wrote: It's much better to do good in a way that no one knows anything about it.",
        answerChoices: ["Henrik Ibsen", "Leo Tolstoy", "Fyodor Dostoevsky", "Jules Verne"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel Anna Karenina in 1877",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-10-1556673316-Xq4p-column-width-inline.jpg',
    },
    {
        question: "Who wrote: Life appears to me too short to be spent in nursing animosity or registering wrongs",
        answerChoices: ["Charlotte Brontë", "Honoré de Balzac", "Edgar Allan Poe", "Alfred Tennyson"],
        correctAnswer: 0,
        answerBook: "Wrote it in the novel Jane Eyre in 1847",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-11-1556673316-ZR8j-column-width-inline.jpg',
    },
    {
        question: "Who wrote: You forget what you want to remember, and you remember what you want to forget.",
        answerChoices: ["Nicholas Sparks", "Mario Vargas Llosa", "Cormac McCarthy", "Dave Eggers "],
        correctAnswer: 2,
        answerBook: "Wrote it in the novel The Road published in 2006",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-46-1556673317-LE0J-column-width-inline.png',
    },
    {
        question: "Who wrote: There is an idea of a Patrick Bateman, some kind of abstraction, but there is no real me, only an entity, something illusory, and though I can hide my cold gaze and you can shake my hand and feel flesh gripping yours and maybe you can even sense our lifestyles are probably comparable: I simply am not there.",
        answerChoices: ["Bret Easton Ellis", "Martin Amis", "John le Carré", "John Grisham"],
        correctAnswer: 0,
        answerBook: "Wrote it in the novel American Psycho published in 1991", imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-13-1556673318-k2C3-column-width-inline.jpg',

    },
    {
        question: "Who wrote: Finally, from so little sleeping and so much reading, his brain dried up and he went completely out of his mind",
        answerChoices: ["William Shakespeare", "Charles Dickens", "Miguel de Cervantes Saavedra","Thomas Hobbes"],
        correctAnswer: 2,
        answerBook: "Wrote it in the novel Don Quixote in 1605",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-47-1556673319-qekU-column-width-inline.jpg',
    },
    {
        question: "Who wrote: We cast a shadow on something wherever we stand, and it is no good moving from place to place to save things; because the shadow always follows. Choose a place where you won’t do harm - yes, choose a place where you won’t do very much harm, and stand in it for all you are worth, facing the sunshine.",
        answerChoices: ["G. K. Chesterton", "E.M. Forster", "W. Somerset Maugham", "L. Frank Baum"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel A Room With A View in 1908",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-42-1556673311-rjTi-column-width-inline.jpg',
    },
    {
        question: "Who wrote: Memories warm you up from the inside. But they also tear you apart.",
        answerChoices: ["John Irving", "Nick Hornby", "Chuck Palahniuk", "Haruki Murakami"],
        correctAnswer: 3,
        answerBook: "Wrote it in the novel Kafka on the Shore in 2002",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-16-1556673320-ahgb-column-width-inline.jpg',
    },
    {
        question: "Who wrote: History, Stephen said, is a nightmare from which I am trying to awake.",
        answerChoices: ["F. Scott Fitzgerald", "James Joyce", "Hermann Hesse", "D. H. Lawrence"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel Ulysses in 1922",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-17-1556673321-w3YK-column-width-inline.png',
    },
    {
        question: "Who wrote: It is a great misfortune to be alone, my friends; and it must be believed that solitude can quickly destroy reason.",
        answerChoices: ["Thomas Hardy", "Jules Verne", "Ambrose Bierce", "Victor Hugo"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel The Mysterious Island in 1874",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-18-1556673323-fMmQ-column-width-inline.jpg',
    },
    {
        question: "Who wrote: And meanwhile time goes about its immemorial work of making everyone look and feel like shit.",
        answerChoices: ["Joseph Heller", "Salman Rushdie", "Martin Amis", "Michael Chabon"],
        correctAnswer: 2,
        answerBook: "Wrote it in the novel London Fields in 1989",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-19-1556673323-m6k7-column-width-inline.jpg',
    },
    {
        question: "Who wrote: No man, for any considerable period, can wear one face to himself and another to the multitude, without finally getting bewildered as to which may be the true.",
        answerChoices: ["Ray Bradbury", "Alexandre Dumas", "Nathaniel Hawthorne","Herman Melville"
        ],
        correctAnswer: 2,
        answerBook: "Wrote it in the novel The Scarlet Letter in 1850",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-49-1556673324-e6iT-column-width-inline.jpg',
    },
    {
        question: "Who wrote: Nowadays people know the price of everything and the value of nothing",
        answerChoices: ["Oscar Wilde", "Kate Chopin", "Rudyard Kipling", "Arthur Conan Doyle"],
        correctAnswer: 0,
        answerBook: "Wrote it in the novel The Picture Of Dorian Gray in 1890",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-50-1556673325-S4sp-column-width-inline.jpg',
    },
    {
        question: "Who wrote: We can experience nothing but the present moment, live in no other second of time, and to understand this is as close as we can get to eternal life.",
        answerChoices: ["Ian McEwan", "Neil Gaiman", "Gore Vidal ", "P.D. James"],
        correctAnswer: 3,
        answerBook: "Wrote it in the novel The Children of Men in 1992",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-51-1556673326-MKBh-column-width-inline.jpg',
    },
    {
        question: "Who wrote: No one forgets the truth; they just get better at lying.",
        answerChoices: ["Ian Fleming", "Richard Yates", "J. D. Salinger", "V. S. Naipaul"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel Revolutionary Road in 1961",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-23-1556673326-DHFl-column-width-inline.jpg',
    },
    {
        question: "Who wrote: She had waited all her life for something, and it had killed her when it found her.",
        answerChoices: ["Zora Neale Hurston", "Franz Kafka", "Virginia Woolf", "Vicki Baum"],
        correctAnswer: 0,
        answerBook: "Wrote it in the novel Their Eyes Were Watching God in 1937",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-24-1556673327-lASa-column-width-inline.jpg',
    },
    {
        question: "Who wrote: We need never be ashamed of our tears",
        answerChoices: ["Henry James", "George Bernard Shaw", "Charles Dickens","Robert Louis Stevenson"],
        correctAnswer: 2,
        answerBook: "Wrote it in the novel Great Expectations in 1890",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-52-1556673328-aODY-column-width-inline.jpg',
    },
    {
        question: "Who wrote: Nothing is so painful to the human mind as a great and sudden change.",
        answerChoices: ["Jane Austen", "Mary Shelley", "John Keats", "Henry David Thoreau"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel Frankenstein published in 1818",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-53-1556673328-QVdm-column-width-inline.jpg',
    },
    {
        question: "Who wrote: It is sometimes an appropriate response to reality to go insane.",
        answerChoices: ["Philip K. Dick", "Frank Herbert", "Norman Mailer", "William Golding"],
        correctAnswer: 0,
        answerBook: "Wrote it in the novel Valis published in 1981",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-27-1556673329-HeYd-column-width-inline.gif',

    },
    {
        question: "Who wrote: It doesn't matter who you are or what you look like, so long as somebody loves you",
        answerChoices: ["Roald Dahl", "Jorge Luis Borges", "Samuel Beckett", "Nora Ephron"],
        correctAnswer: 0,
        answerBook: "Wrote it in the novel The Witches in 1983",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-28-1556673330-30D6-column-width-inline.jpg',
    },
    {
        question: "Who wrote: I know. I was there. I saw the great void in your soul, and you saw mine.",
        choices: ["Patrick O'Brian", "Ursula K. Le Guin", "Sebastian Faulks", "John Irving"],
        correctAnswer: 2,
        answerBook: "Wrote it in the novel Birdsong in 1993",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-29-1556673330-oOaS-column-width-inline.jpg',
    },
    {
        question: "Who wrote: She says nothing at all, but simply stares upward into the dark sky and watches, with sad eyes, the slow dance of the infinite stars.",
        answerChoices: ["William Carlos Williams", "Frank McCourt", "Ernest Hemingway", "Neil Gaiman"],
        correctAnswer: 3,
        answerBook: "Wrote it in the novel Stardust in 1999",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-55-1556673331-p2Eo-column-width-inline.jpg',
    },
    {
        question: "Who wrote: Perhaps it was freedom itself that choked her.",
        answerChoices: ["James Baldwin", "Patricia Highsmith", "Saul Bellow", "Raymond Chandler"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel The Price of Salt in 1952",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-54-1556673331-lNyr-column-width-inline.jpg',
    },
    {
        question: "Who wrote: Why can't people have what they want? The things were all there to content everybody; yet everybody has the wrong thing.",
        answerChoices: ["Ford Madox Ford", "Theodore Dreiser", "Jack London", "Thomas Mann"],
        correctAnswer: 0,
        answerBook: "Wrote it in the novel The Good Soldier in 1915",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-32-1556673332-e23l-column-width-inline.jpg',
    },
    {
        question: "Who wrote: We mortals, men and women, devour many a disappointment between breakfast and dinner-time; keep back the tears and look a little pale about the lips, and in answer to inquiries say, “Oh, nothing!” Pride helps; and pride is not a bad thing when it only urges us to hide our hurts— not to hurt others.",
        answerChoices: ["Anton Chekhov", "Frances Hodgson Burnett", "Heinrich Mann", "George Eliot"],
        correctAnswer: 3,
        answerBook: "Wrote it in the novel Middlemarch in 1874",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-56-1556673332-XoC9-column-width-inline.jpg',
    },
    {
        question: "Who wrote: You are your best thing.",
        answerChoices: ["Philip Roth", "Toni Morrison", "Hunter S. Thompson", "Vladimir Nabokov"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel Beloved in 1987",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-62-1556673333-erK5-column-width-inline.jpg',
    },
    {
        question: "Who wrote: Anyone who ever gave you confidence, you owe them a lot.",
        answerChoices: ["Truman Capote", "Chinua Achebe", "Giuseppe Tomasi di Lampedusa", "Leon Uris"],
        correctAnswer: 0,
        answerBook: "Wrote it in the novel Breakfast at Tiffany's in 1958",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-57-1556673334-LDHt-column-width-inline.jpg',
    },
    {
        question: "Who wrote: Clocks slay time… time is dead as long as it is being clicked off by little wheels; only when the clock stops does time come to life.",
        answerChoices: ["Graham Greene", "William Faulkner", "Nella Larsen", "Sinclair Lewis"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel The Sound and the Fury in 1929",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-58-1556673335-H5sM-column-width-inline.jpeg',
    },
    {
        question: "Who wrote: None of those other things makes a difference. Love is the strongest thing in the world, you know. Nothing can touch it. Nothing comes close. If we love each other we’re safe from it all. Love is the biggest thing there is.",
        answerChoices: ["David Foster Wallace", "Cormac McCarthy", "W. B. Yeats","David Guterson"],
        correctAnswer: 3,
        answerBook: "Wrote it in the novel Snow Falling on Cedars in 1994",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-59-1556673335-F0mW-column-width-inline.jpg',
    },
    {
        question: "Who wrote: The only lies for which we are truly punished are those we tell ourselves.",
        answerChoices: ["V.S. Naipaul", "Malcolm Bradbury", "Douglas Adams", "Tom Wolfe"],
        correctAnswer: 0,
        answerBook: "Wrote it in the novel In a Free State in 1971",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-38-1556673336-U4Dr-column-width-inline.jpg',
    },
    {
        question: "Who wrote: Sometimes we get sad about things and we don’t like to tell other people that we are sad about them. We like to keep it a secret. Or sometimes, we are sad but we really don’t know why we are sad, so we say we aren’t sad but we really are.",
        answerChoices: ["Julia Alvarez", "Mark Haddon", "Albert Camus", "Harper Lee"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel The Curious Incident of the Dog in the Night-Time in 2003",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-60-1556673336-MDMA-column-width-inline.jpg',
    },
    {
        question: "Who wrote: I know not all that may be coming, but be it what it will, I’ll go to it laughing.",
        answerChoices: ["Søren Kierkegaard", "Herman Melville", "Walt Whitman", "Fyodor Dostoevsky"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel Moby Dick in 1851",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-61-1556673337-r8VJ-column-width-inline.jpg',
    },
    {
        question: "Who wrote: Some birds are not meant to be caged, that's all. Their feathers are too bright, their songs too sweet and wild. So you let them go, or when you open the cage to feed them they somehow fly out past you. And the part of you that knows it was wrong to imprison them in the first place rejoices, but still, the place where you live is that much more drab and empty for their departure.",
        answerChoices: ["Louisa May Alcott", "Stephen King", "Ken Kesey", "Robert Browning"],
        correctAnswer: 1,
        answerBook: "Wrote it in the novel Rita Hayworth and the Shawshank Redemption (Different Seasons) in 1982",
        imgUrl: 'https://www.shortlist.com/media/images/2019/05/the-40-most-powerful-literary-quotes-41-1556673338-LWLi-column-width-inline.jpg',
    }]
    
});

