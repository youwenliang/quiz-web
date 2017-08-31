import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import bodymovin from 'bodymovin';
import {Helmet} from 'react-helmet';
import { Redirect } from "react-router-dom";
import loadImage from 'image-promise';

/* --- Global Variable --- */
var quizTitle = "初始題";
var quizNum = 1;
var quizWeight = 1;
var quizImg = "";
var results = ""//(window.location.hash === "") ? "" : decodeURIComponent((window.location.hash).split('#')[1].split('-')[0]);
var gender = ""//(window.location.hash === "") ? "" : decodeURIComponent((window.location.hash).split('#')[1].split('-')[1]);

/* --- Strings --- */
var strings = {
  "外星人": {
    "id": "1",
    "title": "夢想這條路踏上了，就算跪著走，吾往矣！",
    "talent": ["好運-mid", "肝指數-full", "M傾向-mid"],
    "skill": ["真・無雙辯士", "目光如鷹", "愚公移山"],
    "content": ["臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們"],
    "more": "擅長....的你，只要在掌握更好的...，就可以...，成為不只是設計師的...",
    "length": "three"
  },
  "控制狂": {
    "id": "2",
    "title": "交給你了，我有好好記下來了喲（燦笑）",
    "talent": ["耐心度-low", "S傾向-high", "惹人厭指數-mid"],
    "skill": ["皮笑肉不笑", "按表操課", "世紀末魔術師"],
    "content": ["臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們"],
    "more": "擅長....的你，只要在掌握更好的...，就可以...，成為不只是設計師的...",
    "length": "three"
  },
  "CEO": {
    "id": "3",
    "title": "我說要有光，就有了光。",
    "talent": ["市場眼光-high", "商業嗅覺-mid", "野心戰鬥值-high"],
    "skill": ["嘴砲/精準射手", "橫向組織管理", "明星光環"],
    "content": ["臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們"],
    "more": "擅長....的你，只要在掌握更好的...，就可以...，成為不只是設計師的...",
    "length": "two"
  },
  "偵探": {
    "id": "4",
    "title": "真相，永遠只有一個！",
    "talent": ["邏輯力-high", "疑心病-high", "聯想力-mid"],
    "skill": ["換位思考", "讀心術", "海龜湯高手"],
    "content": ["臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們"],
    "more": "擅長....的你，只要在掌握更好的...，就可以...，成為不只是設計師的...",
    "length": "two"
  },
  "科學家": {
    "id": "5",
    "title": "糖、香料、還有美好的味道… 咦？等等，我的化學物Ｘ呢！",
    "talent": ["邏輯力-high", "宅宅程度-mid", "嚴謹度-high"],
    "skill": ["動手做做看", "異元素組合力", "科學精神"],
    "content": ["臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們"],
    "more": "擅長....的你，只要在掌握更好的...，就可以...，成為不只是設計師的...",
    "length": "three"
  },
  "大善人": {
    "id": "6",
    "title": "這世界有太多比錢更重要的事了",
    "talent": ["善良-full", "天真-mid", "小幸運-high"],
    "skill": ["同理他者", "熱心公益", "召喚世界和平"],
    "content": ["臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們"],
    "more": "擅長....的你，只要在掌握更好的...，就可以...，成為不只是設計師的...",
    "length": "three"
  },
  "哲學家": {
    "id": "7",
    "title": "少即是多，色即是空。",
    "talent": ["世俗適應力-low", "理解力-high", "靈性-high"],
    "skill": ["設計是信仰", "形而上的深思熟慮", "看書如喝水"],
    "content": ["臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們"],
    "more": "擅長....的你，只要在掌握更好的...，就可以...，成為不只是設計師的...",
    "length": "three"
  },
  "鍊金術師": {
    "id": "8",
    "title": "令人感到悔恨的不是做過的事，而是那些從未做過的。",
    "talent": ["做了再說-high", "存款數字-low", "勇於突破-high"],
    "skill": ["黑白穿搭愛好者", "超棒的想像力", "異材質掌握力"],
    "content": ["臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們"],
    "more": "擅長....的你，只要在掌握更好的...，就可以...，成為不只是設計師的...",
    "length": ""
  },
  "說書人": {
    "id": "9",
    "title": "我一就天橋底下說書的，講得一口好故事，聽眾一定不會少。",
    "talent": ["文化感知力-high", "狼性-low", "資源回收力-high"],
    "skill": ["時光回朔", "說故事的能力", "隨時準備開咖啡店"],
    "content": ["臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們"],
    "more": "擅長....的你，只要在掌握更好的...，就可以...，成為不只是設計師的...",
    "length": "three"
  },
  "雞排店長": {
    "id": "10",
    "title": "做什麼設計，現在加盟雞排店還來得及唷～",
    "talent": ["炸雞排-high", "賣雞排-high", "吃雞排-high"],
    "skill": ["文創雞排", "鮮美多汁", "攤販設計"],
    "content": ["臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們", "臺條行國大第問所葉要生？是裡他結民費東成十們"],
    "more": "擅長....的你，只要在掌握更好的...，就可以...，成為不只是設計師的...",
    "length": ""
  }
};

var start = "main"; //(!strings[results]) ? "main" : "result";

var quizzes = {
  "q0": "你的性別是？",
  //X
  "q1": "我對設計有熱情？",
  "q2": "你是否對於設計冷感了？",
  "q3": "你的生命難道和設計再也無關了嗎？",
  //A-4
  "q4": "設計作品是否可以保有個人風格，對我選擇工作相當重要",
  "q5": "在市場需求和作品原創性中，我認為必須以原創性作為優先考量",
  "q6": "若是作品能夠廣受大眾喜歡，在個人特色上妥協作品是可以接受的",
  //B-5
  "q7": "我覺得實務比理論來得重要許多",
  "q8": "開始動手做之前，我會找出所有的相關資料進行研究",
  "q9": "比起其他設計師，我認為自己是一個 Maker",
  //C-6
  "q10": "結合不同設計概念所產生的衝突感讓我覺得很有趣",
  "q11": "我自認是一個理性的人",
  "q12": "比起個人追求，我更想藉由設計力量改善社會問題",
  //D-7
  "q13": "社會設計對我來說是一個超讚的概念",
  "q14": "我有很在意的社會議題，並且曾經參與其中",
  "q15": "我一直試圖藉由設計幫助解決社會問題",
  //E-8
  "q16": "在工作團隊中，我經常擔任激勵他人的角色",
  "q17": "對於未來我有無限的企圖心",
  "q18": "我能夠說服一群人做一件很酷的事",
  //F-9
  "q19": "想像力就是我的超能力",
  "q20": "我其實偷偷覺得自己是怪咖",
  "q21": "人不瘋狂枉少年",
  //G-10
  "q22": "結合不同設計概念所產生的未知可能讓我覺得很有趣",
  "q23": "比起其他設計師，我認為自己是一個 Maker",
  "q24": "我的觀察力很強，連自己都會被自己嚇到",
  //H-11
  "q25": "沒靈感時，該怎麼辦？",
  //I-12
  "q26": "我很能忍受不明確的狀態",
  "q27": "我喜歡有條理地安排生活與工作",
  "q28": "面對計畫突然的變動，我會不自覺的感到不安或生氣",
  "q29": "跟我共事的夥伴和業主都被我控制得妥妥",
  "q30": "我的設計案99%都準時交件",
  "done": ""
};

var answers = {
  "q0": ["男", "女"],
  //X
  "q1": ["是", "否"],
  "q2": ["是", "否"],
  "q3": ["是", "否"],
  //A
  "q4": ["是", "否"],
  "q5": ["是", "否"],
  "q6": ["是", "否"],
  //B
  "q7": ["是", "否"],
  "q8": ["是", "否"],
  "q9": ["是", "否"],
  //C
  "q10": ["是", "否"],
  "q11": ["是", "否"],
  "q12": ["是", "否"],
  //D
  "q13": ["是", "否"],
  "q14": ["是", "否"],
  "q15": ["是", "否"],
  //E
  "q16": ["是", "否"],
  "q17": ["是", "否"],
  "q18": ["是", "否"],
  //F
  "q19": ["是", "否"],
  "q20": ["是", "否"],
  "q21": ["是", "否"],
  //G
  "q22": ["是", "否"],
  "q23": ["是", "否"],
  "q24": ["是", "否"],
  //I
  "q26": ["是", "否"],
  "q27": ["是", "否"],
  "q28": ["是", "否"],
  "q29": ["是", "否"],
  "q30": ["是", "否"],
  "done": ["",""]
};

/* --- App --- */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: start
    }
  }
  handler = (s) => {
    var temp = this;
    document.getElementById('root').classList.add('fade');
    window.location.hash = s;
    if(s === "result") {
      var resultImages = [];
      console.log(results);
      resultImages.push('images/result-images/Results-'+strings[results].id+gender+'.png');
      for (var z = 1; z <= 3; z++) {
        resultImages.push('images/result-images/Icons-'+strings[results].id+'-'+z+'.png');
      }
      loadImage(resultImages)
      .then(function (allImgs) {
        console.log(allImgs.length, 'images loaded!', allImgs);
        setTimeout(function(){
          document.getElementById('root').classList.remove('fade');
          document.querySelector('body').scrollTop = 0;
          temp.setState({stage: s});
        }, 400);
        setTimeout(function(){
          $('#loading').addClass('fade');
          setTimeout(function(){
            $('#scroll-down').removeClass('hide');
            $('.result').addClass('move');
          }, 3000);
        }, 1200);
      })
      .catch(function (err) {
        console.error('One or more images have failed to load :(');
        console.error(err.errored);
        console.info('But these loaded fine:');
        console.info(err.loaded);
      });

    } else {
      setTimeout(function(){
        document.getElementById('root').classList.remove('fade');
        document.querySelector('body').scrollTop = 0;
        temp.setState({stage: s});
      }, 400);
    }
  }

  render() {
    let main = null;
    let quiz = null;
    let result = null;
    var title = results === "" ? "給設計師的專屬測驗" : "你是一個"+results;
    if(this.state.stage === "main") main = <Main stage={this.state.stage} handler={this.handler.bind(this)}/>;
    if(this.state.stage === "quiz") quiz = <Quiz stage={this.state.stage} handler={this.handler.bind(this)}/>
    if(this.state.stage === "result") result = <Result stage={this.state.stage} handler={this.handler.bind(this)}/>;
    return (
      <div className="App">
        <Helmet>
          <meta property="og:title" content={"《不只是設計師》- "+title } />
          <meta name="description" content={results} />
          <meta property="og:url" content={window.location.href}/>
          <title>{"《不只是設計師》- "+title}</title>
        </Helmet>
        <Redirect from='*' to='/' />
        {main}
        {quiz}
        {result}
      </div>
    );
  }
}

/* --- Main --- */
class Main extends Component {
  render() {
    // console.log(this.props.stage);
    return (
      <div className="main">
        <div id="main-header">
          <div id="main-animation"></div>
        </div>
        <div id="main-content">
          <h1>給設計師的專屬測驗</h1>
          <p>每一個設計師，包括你，都不只是設計師。<br/>簡單三分鐘，看看除了設計師之外，你的隱藏身份是什麼？</p>
          <div className="action-button" onClick={() => this.props.handler("quiz")}>開始測驗吧</div>
        </div>
      </div>
    );
  }
}

/* --- Quiz --- */
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "q0",
      answers: []
    }
  }

  nextQuiz = (a, b) => {
    quizNum++;
    document.querySelector('body').scrollTop = 0;
    var next = "q" + (parseInt(a.split('q')[1],10) + 1);
    var currentAnswer = this.state.answers;
    currentAnswer[a] = b;
    var weight = 5;

    switch(a) {
    case "q0":
      if(b) gender = "m";
      else gender = "f";
      quizImg = "Quiz-icon-1";
      $('.quiz-image').addClass('switch');
      break;
    /*** X ***/
    case "q1":
      if(b) {
        next = "q4";
        quizTitle = "A";
        quizImg = "Quiz-icon-4";
      } else quizImg = "Quiz-icon-2";
      $('.quiz-image').addClass('switch');
      break;
    case "q2":
      if(!b) {
        next = "q4";
        quizTitle = "A";
        quizImg = "Quiz-icon-4";
      } else quizImg = "Quiz-icon-3";
      $('.quiz-image').addClass('switch');
      break;
    case "q3":
      if(b) {
        results = "雞排店長";
        quizWeight = 96;
        next = "done";
        quizNum--;
        this.props.handler("result");
      } else {
        quizTitle = "A";
        quizImg = "Quiz-icon-4";
      }
      $('.quiz-image').addClass('switch');
      break;
    /*** A ***/
    case "q6":
      var countA = 0;
      if(currentAnswer["q4"]) countA++;
      if(currentAnswer["q5"]) countA++;
      if(!currentAnswer["q6"]) countA++;
      if(countA >= 2) {
        next = "q25";
        quizTitle = "H";
        quizImg = "Quiz-icon-11";
        weight = 0;
        quizWeight = 51;
      } else {
        quizTitle = "B";
        quizImg = "Quiz-icon-5";
      }
      $('.quiz-image').addClass('switch');
      break;
    /*** B ***/
    case "q9":
      var countB = 0;
      if(!currentAnswer["q7"]) countB++;
      if(currentAnswer["q8"]) countB++;
      if(!currentAnswer["q9"]) countB++;
      if(countB < 2) {
        next = "q13";
        quizTitle = "D";
        quizImg = "Quiz-icon-7";
      } else {
        quizTitle = "C";
        quizImg = "Quiz-icon-6";
      }
      $('.quiz-image').addClass('switch');
      break;
    /*** C ***/
    case "q12":
      if(currentAnswer["q12"]) {
        next = "q26"
        results = "大善人";
        quizTitle = "I";
        quizImg = "Quiz-icon-12";
      } else {
        next = "q26"
        results = "科學家";
        quizTitle = "I";
        quizImg = "Quiz-icon-12";
      }
      $('.quiz-image').addClass('switch');
      break;
    /*** D ***/
    case "q15":
      var countD = 0;
      if(currentAnswer["q13"]) countD++;
      if(currentAnswer["q14"]) countD++;
      if(currentAnswer["q15"]) countD++;
      if(countD > 2) {
        next = "q26";
        quizTitle = "I";
        quizImg = "Quiz-icon-12";
        results = "大善人";
      } else {
        quizTitle = "E";
        quizImg = "Quiz-icon-8";
        quizWeight = 61;
        weight = 2;
      }
      $('.quiz-image').addClass('switch');
      break;
    /*** E ***/
    case "q18":
      if(!(currentAnswer["q17"] && currentAnswer["q18"])) {
        next = "q22";
        quizTitle = "G";
        quizImg = "Quiz-icon-10";
      } else {
        quizTitle = "F";
        quizImg = "Quiz-icon-9";
      }
      $('.quiz-image').addClass('switch');
      break;
    /*** F ***/
    case "q21":
      if(currentAnswer["q19"] && currentAnswer["q21"]) {
        next = "q26";
        quizTitle = "I";
        quizImg = "Quiz-icon-12";
        results = "外星人";
      } else {
        next = "q26"
        quizTitle = "I";
        quizImg = "Quiz-icon-12";
        results = "CEO";
      }
      $('.quiz-image').addClass('switch');
      break;
    /*** G ***/
    case "q24":
      if(currentAnswer["q24"]) {
        next = "q26";
        quizTitle = "I";
        quizImg = "Quiz-icon-12";
        results = "偵探";
      } else {
        next = "q26"
        quizTitle = "I";
        quizImg = "Quiz-icon-12";
        results = "科學家";
      }
      $('.quiz-image').addClass('switch');
      break;
    /*** H ***/
    case "q25":
      if(currentAnswer["q25"] === "a") results = "鍊金術師";
      else if(currentAnswer["q25"] === "b") results = "說書人";
      else if(currentAnswer["q25"] === "c") results = "哲學家";
      next = "q26";
      quizTitle = "I";
      quizImg = "Quiz-icon-12";
      $('.quiz-image').addClass('switch');
      break;
    /*** I ***/
    case "q30":
      var countI = 0;
      if(!currentAnswer["q26"]) countI++;
      if(currentAnswer["q27"]) countI++;
      if(currentAnswer["q28"]) countI++;
      if(currentAnswer["q29"]) countI++;
      if(currentAnswer["q30"]) countI++;
      if(countI === 5) {
        results = "控制狂";
        this.props.handler("result");
      } else {
        this.props.handler("result");
      }
      $('.quiz-image').addClass('switch');
      next = "done";
      quizNum--;
      break;
    default:
      break;
    }
    if(a.split('q')[1] >= 16 && a.split('q')[1] <= 24) weight = 2;
    if(next === "q26") {
      weight = 0;
      quizWeight = 76;
    }
    quizWeight+=weight;

    var temp = this;

    $('#quiz-content').addClass('switch');

    $('#progress-circle').html((quizWeight-1)+'%');

    var w = $(window).width() < 768 ? 250 : 700;
    $('#progress-circle').css('left', w/100*(quizWeight-1) - 1 +'px');
    $('.progress-bar').css('width', w/100*(quizWeight-1)+'px');

    setTimeout(function(){
      if(next === "done") {
        $('.progress-bar').css('display','none');
        $('#loading').removeClass('fade');
      }
      temp.setState({
        current: next,
        answers: currentAnswer
      });
    }, 200);
    setTimeout(function(){
      if(next !== "done") {
        $('#quiz-content').removeClass('switch');
        $('.quiz-image').removeClass('switch');
      }
    }, 400);
  }

  updateDimensions() {
    var w = $(window).width() < 768 ? 250 : 700;
    $('#progress-circle').css('left', w/100*(quizWeight-1) - 1 +'px');
    $('.progress-bar').css('width', w/100*(quizWeight-1)+'px');
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {    
    var divStyle = {
      backgroundImage: "url(images/quiz-images/"+quizImg+".png)"
    }

    let options = null;
    if (this.state.current === "q25") {
          options = <div className="quiz-action three">
                      <div className="quiz-button" onClick={() => {this.nextQuiz(this.state.current, "a")}}>再試個十小時看看</div>
                      <div className="quiz-button" onClick={() => {this.nextQuiz(this.state.current, "b")}}>去街上走走看看</div>
                      <div className="quiz-button" onClick={() => {this.nextQuiz(this.state.current, "c")}}>思考為什麼我要做這個設計？</div>
                    </div>;
    }
    else if (this.state.current === "q0"){
          options = <div className="quiz-action">
                      <div className="quiz-button" onClick={() => {this.nextQuiz(this.state.current, false)}}>{answers[this.state.current][1]}</div>
                      <div className="quiz-button" onClick={() => {this.nextQuiz(this.state.current, true)}}>{answers[this.state.current][0]}</div>
                    </div>;        
    }
    else {
          options = <div className="quiz-action">
                      <div className="quiz-button" id="quiz-no"  onClick={() => {this.nextQuiz(this.state.current, false)}}>{answers[this.state.current][1]}</div>
                      <div className="quiz-button" id="quiz-yes" onClick={() => {this.nextQuiz(this.state.current, true)}}>{answers[this.state.current][0]}</div>
                    </div>;        
    }
    return (
      <div className="quiz">
        <div className="progress-bar"><div id="progress-circle">0%</div></div>
        <div className="quiz-image" style={divStyle}></div>
        <div id="quiz-content">
          {/*<h2>{quizTitle}</h2>*/}
          <p>{quizNum+". "+quizzes[this.state.current]}</p>
          {options}
        </div>
      </div>
    );
  }
}

/* --- Result --- */
class Result extends Component {

  componentDidMount = () => {
    // console.log("mount-result");
    setTimeout(function(){
      $('.result-image').addClass('slide-in');
      $('.result-bar').addClass('grow');
    },100);
  };

  scrollto = () => {
    $('html, body').animate({
        scrollTop: $(".mail").offset().top - 180
    }, 400);
    $('#scroll-down').addClass('hide');
    $('.result').removeClass('move');
  }

  close = () => {
    $('#scroll-down').addClass('hide');
    $('.result').removeClass('move');
  }

  render() {
    var divStyleHeader = {backgroundImage: "url(images/result-images/Results-"+strings[results].id+gender+".png)"};
    var divStyleIcon1 = {backgroundImage: "url(images/result-images/Icons-"+strings[results].id+"-1.png)"};
    var divStyleIcon2 = {backgroundImage: "url(images/result-images/Icons-"+strings[results].id+"-2.png)"};
    var divStyleIcon3 = {backgroundImage: "url(images/result-images/Icons-"+strings[results].id+"-3.png)"};
    return (
      <div className="result" id={results}>
        <div id="scroll-down" className="hide">
          <div className="scroll-container">
            <div id="close" onClick={this.close}></div>
            <h2>Words</h2>
            <div className="action-button" onClick={this.scrollto}>開始測驗吧</div>
          </div>
        </div>
        <div className="result-banner">
          <h3>你除了是設計師之外，更是一個......</h3>
        </div>
        <section id="result-header">
          <div className="result-image" style={divStyleHeader}></div>
          <div className={"result-content " + strings[results].length}>
            <div id="result-bg"><h2>{results}</h2></div>
            <h3>{strings[results].title}</h3>
            <div className="result-bar-container">
              <h6>{strings[results].talent[0].split('-')[0]}</h6>
              <div className={"result-bar "+strings[results].talent[0].split('-')[1]}></div>
              <h6>{strings[results].talent[1].split('-')[0]}</h6>
              <div className={"result-bar "+strings[results].talent[1].split('-')[1]}></div>
              <h6>{strings[results].talent[2].split('-')[0]}</h6>
              <div className={"result-bar "+strings[results].talent[2].split('-')[1]}></div>
            </div>
          </div>
        </section>
        <section id="result-details">
          <h3>這樣的你，會需要知道什麼呢？</h3>
          <div className="result-icons-container">
            <div className="result-icons">
              <div style={divStyleIcon1}></div>
              <h4>{strings[results].skill[0]}</h4>
              <p>{strings[results].content[0]}</p>
            </div>
            <div className="result-icons">
              <div style={divStyleIcon2}></div>
              <h4>{strings[results].skill[1]}</h4>
              <p>{strings[results].content[1]}</p>
            </div>
            <div className="result-icons">
              <div style={divStyleIcon3}></div>
              <h4>{strings[results].skill[2]}</h4>
              <p>{strings[results].content[2]}</p>
            </div>
          </div>
        </section>
        <div className="result-banner" id="banner-2">
          <h3>你除了是設計師之外，更是一個<strong>{results}</strong></h3>
          <p>{strings[results].more}</p>
        </div>
        <Mail/>
        <footer>
          <div className="container">
            <a href="/"><div className="logo">Tone</div></a>
            <p>Copyright © 2017 TONEskill Inc. | All pictures are for editorial use only.</p>
          </div>
        </footer>
      </div>
    );
  }
}

/* --- Mail --- */
class Mail extends Component {
  componentDidMount = () => {
    var animationData = require('./json/tone/tone.json');
    var animation = bodymovin.loadAnimation({
        container: document.getElementById('tone-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData
      })
  };

  back() {
    window.location.href = window.location.href.split('#')[0];
  }

  render() {
    var url = "https://www.facebook.com/dialog/share?app_id=144185409502046&display=popup&href=https://youwenliang.github.io/tone-quiz/results/"+strings[results].id+gender+"&redirect_uri=https://www.facebook.com/";
    return (
      <div className="mail">
        <div className="container" id="mail-container">
          <div id="mail-image">
            <div id="tone-animation"></div>
          </div>
          <div id="mail-content">
            <div className="logo" id="mail-logo">Tone</div>
            <h2>給設計師的溝通研習所</h2>
            <p>設計的過程就是一場溝通，藉由好的溝通讓你實現更多可能。我們準備了一個小指南，讓你在設計的時候，能夠更貼近客戶需求。留下你的mail，立馬收到Tone識給你的第一份見面禮！</p>
          </div>  
        </div>
        <form action="//toneskill.us16.list-manage.com/subscribe/post?u=a9dda7764d795331587a40f84&amp;id=0142a7caca" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" noValidate>
          <input type="email" placeholder="Email" spellCheck="false" autoComplete="false" name="EMAIL" />
          <input id="mail-button" type="submit" name="subscribe" value="送出" />
        </form>
        <div className="share-action">
          <div className="action-button" id="share-button" onClick={this.back}>再玩一次</div>
          <a href={url}><div className="action-button" id="share-quiz"><i className="fa fa-facebook-official" aria-hidden="true"></i>分享結果</div></a>
        </div>
      </div>
    );
  }
}

export default App;
