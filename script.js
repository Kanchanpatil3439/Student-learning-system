// ===============================
// USER STATE
// ===============================

let state = {
    name: "",
    email: "",
    password: "",
    year: "",
    branch: "",
    target: ""
};

const loginScreen = document.getElementById("loginScreen");
const app = document.getElementById("app");
const authContent = document.getElementById("authContent");


// ===============================
// LOGIN / SIGNUP UI
// ===============================

function showAuth(type) {

    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");

    if (type === "login") {

        loginTab.classList.add("active");
        signupTab.classList.remove("active");

        authContent.innerHTML = `

            <div class="eyebrow">WELCOME BACK</div>

            <h2>Login to SkillPath AI</h2>

            <p>
                Continue your personalized learning and career journey.
            </p>

            <div class="field">
                <label>Email</label>

                <input
                    type="email"
                    id="loginEmail"
                    placeholder="Enter your email"
                >
            </div>

            <div class="field">
                <label>Password</label>

                <input
                    type="password"
                    id="loginPassword"
                    placeholder="Enter your password"
                >
            </div>

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-top:12px;
                font-size:9px;
            ">

                <label>
                    <input type="checkbox">
                    Remember me
                </label>

                <button
                    onclick="showToast('Password reset feature will be connected to backend')"
                    style="
                        background:none;
                        color:#6259e8;
                        font-size:9px;
                        font-weight:700;
                    "
                >
                    Forgot password?
                </button>

            </div>

            <button
                class="login-btn"
                onclick="loginUser()"
            >
                Login →
            </button>

            <p style="text-align:center;margin-top:18px">
                Don't have an account?
                <button
                    onclick="showAuth('signup')"
                    style="
                        background:none;
                        color:#6259e8;
                        font-weight:800;
                        font-size:10px;
                    "
                >
                    Sign Up
                </button>
            </p>

        `;

    } else {

        loginTab.classList.remove("active");
        signupTab.classList.add("active");

        authContent.innerHTML = `

            <div class="eyebrow">CREATE YOUR ACCOUNT</div>

            <h2>Start your journey 🚀</h2>

            <p>
                Tell us about yourself and we'll build your personalized roadmap.
            </p>

            <div class="field">

                <label>Full Name</label>

                <input
                    type="text"
                    id="signupName"
                    placeholder="Enter your full name"
                >

            </div>

            <div class="field">

                <label>Email</label>

                <input
                    type="email"
                    id="signupEmail"
                    placeholder="Enter your email"
                >

            </div>

            <div class="field">

                <label>Password</label>

                <input
                    type="password"
                    id="signupPassword"
                    placeholder="Create a password"
                >

            </div>

            <div class="field">

                <label>Confirm Password</label>

                <input
                    type="password"
                    id="signupConfirmPassword"
                    placeholder="Confirm your password"
                >

            </div>

            <button
                class="login-btn"
                onclick="startOnboarding()"
            >
                Continue →
            </button>

            <p style="text-align:center;margin-top:18px">

                Already have an account?

                <button
                    onclick="showAuth('login')"
                    style="
                        background:none;
                        color:#6259e8;
                        font-weight:800;
                        font-size:10px;
                    "
                >
                    Login
                </button>

            </p>

        `;
    }
}


// ===============================
// SIGN UP
// ===============================

function startOnboarding() {

    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("signupConfirmPassword").value;


    // Validation

    if (!name) {
        showToast("Please enter your name");
        return;
    }

    if (!email) {
        showToast("Please enter your email");
        return;
    }

    if (!password) {
        showToast("Please create a password");
        return;
    }

    if (password !== confirmPassword) {
        showToast("Passwords do not match");
        return;
    }


    // Save temporary user information

    state.name = name;
    state.email = email;
    state.password = password;


    // Move to academic information

    showAcademicForm();
}
// ===============================
// LOGOUT
// ===============================

function logoutUser() {
    localStorage.removeItem("skillpathUser");
    state={name:"",email:"",password:"",year:"",branch:"",target:""};
    app.classList.add("hidden");
    loginScreen.classList.remove("hidden");
    showAuth("login");
    const sidebar=document.getElementById("sidebar");
    if(sidebar) sidebar.classList.remove("open");
    window.scrollTo({top:0,behavior:"instant"});
    showToast("You have been logged out successfully.");
}

// ===============================
// ACADEMIC INFORMATION
// ===============================

function showAcademicForm() {

    authContent.innerHTML = `

        <div class="eyebrow">
            YOUR ACADEMIC PROFILE
        </div>

        <h2>Tell us about your studies.</h2>

        <p>
            This information helps us create the right roadmap for you.
        </p>


        <div class="field">

            <label>Engineering Year</label>

            <select id="signupYear">

                <option value="">
                    Select your year
                </option>

                <option value="1st Year">
                    1st Year
                </option>

                <option value="2nd Year">
                    2nd Year
                </option>

                <option value="3rd Year">
                    3rd Year
                </option>

                <option value="4th Year">
                    4th Year
                </option>

            </select>

        </div>


        <div class="field">

            <label>Engineering Branch</label>

            <select id="signupBranch">

                <option value="">
                    Select your branch
                </option>

                <option>
                    Artificial Intelligence & Machine Learning
                </option>

                <option>
                    Computer Science Engineering
                </option>

                <option>
                    Information Technology
                </option>

                <option>
                    Electronics & Telecommunication
                </option>

                <option>
                    Mechanical Engineering
                </option>

                <option>
                    Civil Engineering
                </option>

            </select>

        </div>


        <button
            class="login-btn"
            onclick="saveAcademicInfo()"
        >
            Continue →
        </button>

    `;
}


// ===============================
// SAVE ACADEMIC INFORMATION
// ===============================

function saveAcademicInfo() {

    const year =
        document.getElementById("signupYear").value;

    const branch =
        document.getElementById("signupBranch").value;


    if (!year) {

        showToast("Please select your year");

        return;
    }


    if (!branch) {

        showToast("Please select your branch");

        return;
    }


    state.year = year;

    state.branch = branch;


    showCareerForm();
}


// ===============================
// CAREER GOAL
// ===============================

function showCareerForm() {

    authContent.innerHTML = `

        <div class="eyebrow">
            CAREER DIRECTION
        </div>

        <h2>Where do you want to go?</h2>

        <p>
            Choose your target career. SkillPath AI will personalize
            your roadmap around this goal.
        </p>


        <div class="field">

            <label>Target Career</label>

            <select id="signupCareer">

                <option value="">
                    Select target career
                </option>

                <option>
                    AI / ML Engineer
                </option>

                <option>
                    Software Engineer
                </option>

                <option>
                    Data Scientist
                </option>

                <option>
                    Data Analyst
                </option>

                <option>
                    Cybersecurity Engineer
                </option>

                <option>
                    Cloud Engineer
                </option>

                <option>
                    UI / UX Designer
                </option>

            </select>

        </div>


        <button
            class="login-btn"
            onclick="completeSignup()"
        >
            Generate My Roadmap ✦
        </button>

    `;
}


// ===============================
// COMPLETE SIGNUP
// ===============================

function completeSignup() {

    const career =
        document.getElementById("signupCareer").value;


    if (!career) {

        showToast("Please select your target career");

        return;
    }


    state.target = career;


    // Save user information in browser

    localStorage.setItem(
        "skillpathUser",
        JSON.stringify(state)
    );


    openDashboard();
}


// ===============================
// OPEN DASHBOARD
// ===============================

function openDashboard() {
    loginScreen.classList.add("hidden");
    app.classList.remove("hidden");
    const firstName = state.name ? state.name.trim().split(/\s+/)[0] : "Student";
    const initials = state.name ? state.name.trim().split(/\s+/).slice(0,2).map(p=>p[0].toUpperCase()).join("") : "SP";
    const miniName=document.getElementById("miniName");
    const miniCourse=document.getElementById("miniCourse");
    const miniAvatar=document.getElementById("miniAvatar");
    const topAvatar=document.getElementById("topAvatar");
    if(miniName) miniName.textContent=state.name||"Student";
    if(miniCourse) miniCourse.textContent=`${state.branch||"Engineering"} · ${state.year||""}`.replace(/ · $/,"");
    if(miniAvatar) miniAvatar.textContent=initials;
    if(topAvatar) topAvatar.textContent=initials;
    go("dashboard");
    showToast(`Welcome to SkillPath AI, ${firstName}! ✦`);
}


// ===============================
// LOGIN
// ===============================

function loginUser() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if (!email || !password) {

        showToast(
            "Please enter email and password"
        );

        return;
    }


    // Get saved user

    const savedUser =
        JSON.parse(
            localStorage.getItem("skillpathUser")
        );


    if (!savedUser) {

        showToast(
            "No account found. Please Sign Up first."
        );

        return;
    }


    if (savedUser.email !== email) {

        showToast(
            "Email not found"
        );

        return;
    }


    /*
       For this frontend demo we are not storing
       the actual password.

       Your FastAPI backend will handle real
       authentication later.
    */


    state = savedUser;


    openDashboard();
}


// ===============================
// AUTO LOGIN
// ===============================

function checkSavedUser() {

    const savedUser =
        localStorage.getItem("skillpathUser");


    if (savedUser) {

        state =
            JSON.parse(savedUser);

        // Optional:
        // automatically open dashboard

        // openDashboard();
    }
}


// Run login screen

checkSavedUser();
showAuth("login");
const page=document.getElementById("page");
const toast=document.getElementById("toast");
const modal=document.getElementById("modal");
const box=document.getElementById("modalBox");


const stats=(a,b,c,d)=>`<div class="card stat"><div class="stat-top"><span>${b}</span><div class="stat-icon">${a}</div></div><div class="stat-value">${c}</div><div class="green" style="font-size:8px;margin-top:4px">${d}</div></div>`;
const head=(t,s,l="")=>`<div class="card-head"><div><div class="card-title">${t}</div><div class="card-sub">${s||""}</div></div>${l?`<button class="link">${l}</button>`:""}</div>`;
const bar=v=>`<div class="bar"><i style="width:${v}%"></i></div>`;
function shell(ey,t,s,a=""){return `<div class="page-head"><div><div class="eyebrow">${ey}</div><h1 class="page-title">${t}</h1><p class="page-sub">${s}</p></div><div class="actions">${a}</div></div>`}

const skills=[["Python",75],["DSA",60],["SQL",50],["Statistics",40],["Machine Learning",25],["Git/GitHub",82]];
const projects=[["Spam Email Detection","NLP • TF-IDF • Naive Bayes","Intermediate","3 weeks","✉"],["Student Performance Predictor","Python • Pandas • ML","Beginner","2 weeks","◈"],["AI Career Recommendation","Python • Similarity • ML","Advanced","4 weeks","✦"],["RAG Study Assistant","Python • Embeddings • RAG","Advanced","4 weeks","✧"],["Campus Event Predictor","Python • Data Science","Intermediate","3 weeks","◫"],["Personal Portfolio","HTML • CSS • JavaScript","Beginner","1 week","⌘"]];

function dashboard(){return shell("PERSONALIZED LEARNING","Good morning, "+state.name.split(" ")[0]+" 👋",state.branch+" · "+state.year,"<button class='btn secondary' onclick='showToast(\"Dashboard refreshed\")'>↻ Refresh</button>")+`
<div class="grid stats">${stats("◔","Overall Progress","42%","↑ 8% this month")}${stats("↗","Career Readiness","64%","↑ 12% this month")}${stats("🔥","Learning Streak","7 days","Personal best: 12")}${stats("◇","Skills Completed","12 / 28","3 skills this month")}</div>
<div class="grid layout">
<div class="card next">${head("🎯 What should I do next?","Highest-priority recommendation")}<div class="next-inner"><div class="next-icon">Σ</div><div><div class="next-label">Recommended skill</div><h3>Learn Statistics for Machine Learning</h3><p>Statistics is your next prerequisite. Completing it unlocks Machine Learning Fundamentals in your roadmap.</p><div class="chips"><span class="chip">5–7 days</span><span class="chip">Beginner</span><span class="chip">Prerequisite</span></div></div><div class="ring"><span>72%</span></div></div><button class="btn primary" style="margin-top:15px" onclick="skillModal()">Start learning →</button></div>
<div class="card">${head("Your Roadmap","Semester-aware career path","View full")}<div class="timeline">
${[["✓","YEAR 1","Programming Fundamentals","Completed","done"],["✓","YEAR 2","Python & Git/GitHub","Completed","done"],["●","CURRENT","DSA + Statistics","In progress","current"],["○","NEXT","Machine Learning","Unlocks after Statistics",""]].map(x=>`<div class="road ${x[4]}"><div class="road-dot">${x[0]}</div><div><small>${x[1]}</small><strong>${x[2]}</strong><p>${x[3]}</p></div></div>`).join("")}</div></div></div>
<div class="grid bottom">
<div class="card">${head("🧠 Skill Progress","Current proficiency")}<div class="skills">${skills.slice(0,5).map(s=>`<div class="skill-line"><span>${s[0]}</span>${bar(s[1])}<span style="font-size:8px;color:#9299a7">${s[1]}%</span></div>`).join("")}</div></div>
<div class="card">${head("🚀 Recommended project","Matched to your current level")}<div class="project"><div class="project-icon">✉</div><div><h4>Spam Email Detection</h4><p>Intermediate · 3 weeks · AI/ML</p><div class="chips"><span class="chip">Python</span><span class="chip">NLP</span><span class="chip">ML</span></div></div></div><div class="card ai-card"><div class="ai-flex"><div class="orb">✦</div><div><strong>Need help deciding?</strong><small>Your AI Mentor knows your roadmap.</small></div><button class="btn primary" style="margin-left:auto" onclick="go('mentor')">Ask AI</button></div></div></div></div>
<div class="grid bottom"><div class="card">${head("📅 Today's Plan","Small steps, consistent progress")}<div class="today">${["Complete Python functions","Solve 5 DSA problems","Study Statistics basics","Work on ML project"].map((x,i)=>`<label><input type="checkbox">${x}<span>${[25,45,40,30][i]} min</span></label>`).join("")}</div></div><div class="card career-dark">${head("CAREER READINESS","Target: "+state.target)}<div class="score">64%</div><div class="careerbar"><i></i></div><div style="font-size:8px;color:#c1c5d4">You're on track. Close your biggest skill gaps next.</div><div class="chips"><span class="chip" style="background:#ffffff12;color:#dce0ec">Python ✓</span><span class="chip" style="background:#ffffff12;color:#dce0ec">Statistics 65%</span><span class="chip" style="background:#ffffff12;color:#dce0ec">ML 55%</span></div></div></div>`}

function roadmap(){return shell("YOUR LEARNING PATH","My Roadmap","A personalized path from engineering fundamentals to career readiness","<button class='btn primary' onclick='showToast(\"Roadmap recalculated using your latest progress\")'>✦ Recalculate</button>")+`<div class="roadmap"><div class="card">${head("Career roadmap",state.branch+" · Target: "+state.target)}<div class="track">${[["✓","Year 1","Foundation","done"],["✓","Year 2","Core skills","done"],["●","Year 2","Current semester","current"],["○","Year 3","Specialization",""],["○","Year 4","Career ready",""]].map(x=>`<div class="stage ${x[3]}"><div class="circle">${x[0]}</div><strong>${x[1]}</strong><small>${x[2]}</small></div>`).join("")}</div><div class="milestones">${["Programming Fundamentals","Python","Git & GitHub","Data Structures","Statistics","Machine Learning","Deep Learning","NLP / LLMs"].map((x,i)=>`<div class="milestone"><b>${x}</b><p>${i<4?"✓ Completed":"Next milestone in your roadmap."}</p></div>`).join("")}</div></div><div class="card">${head("Next milestone","Complete these to unlock ML")}${[["Statistics",40],["DSA",60],["Python",75]].map(x=>`<div style="margin:15px 0"><div style="display:flex;justify-content:space-between;font-size:8px;margin-bottom:5px"><b>${x[0]}</b><span>${x[1]}%</span></div>${bar(x[1])}</div>`).join("")}<div style="padding:12px;background:#f7f7fc;border-radius:11px;font-size:9px;color:var(--muted)">✦ <b style="color:var(--ink)">Why Statistics?</b><br>It supports probability, model evaluation and ML foundations.</div></div></div>`}

function skillsPage(){return shell("SKILL INTELLIGENCE","My Skills","Track your proficiency and discover what to learn next","<button class='btn primary' onclick='showToast(\"Skill assessment opened\")'>Take assessment</button>")+`<div class="grid two"><div class="card">${head("Your skill profile","6 tracked skills")}<div class="skill-grid">${skills.map(s=>`<div class="skill-card"><div class="skill-top"><h4>${s[0]}</h4><span class="level">${s[1]>70?"Strong":"Developing"}</span></div>${bar(s[1])}<div class="skill-foot"><span>${s[1]}% proficiency</span><span>${s[1]>70?"Strong":"Developing"}</span></div></div>`).join("")}</div></div><div class="card">${head("Skill dependency graph","Prerequisite relationships")}<div style="text-align:center;padding:15px">${["Programming","Python","Statistics","Machine Learning","Deep Learning"].map((x,i)=>`<div><span class="chip" style="display:inline-block;${i===3?"background:#e8f8f0;color:#16865c":""}">${x}</span>${i<4?'<div style="color:#aaa;margin:7px">↓</div>':""}</div>`).join("")}</div><div style="padding:11px;background:#f7f7fc;border-radius:11px;font-size:8px;color:var(--muted)"><b style="color:var(--ink)">AI recommendation:</b> Statistics is the next highest-impact skill.</div></div></div>`}

function projectsPage(){return shell("PROJECT LAB","Recommended Projects","Build projects matched to your skills and target career","<button class='btn secondary' onclick='showToast(\"Project filters opened\")'>☷ Filters</button>")+`<div class="card ai-card" style="margin-bottom:15px"><div class="ai-flex"><div class="orb">✦</div><div><strong>AI project matching is active</strong><small>Projects are ranked using skills, prerequisites, career goal and progress.</small></div></div></div><div class="project-grid">${projects.map(p=>`<div class="card project-tile"><div class="cover">${p[4]}</div><h3>${p[0]}</h3><p>${p[1]}</p><div class="meta"><span>★ ${p[2]}</span><span>◷ ${p[3]}</span></div><button class="btn secondary" style="width:100%;margin-top:12px" onclick="projectModal('${p[0]}','${p[1]}','${p[2]}','${p[3]}')">View project →</button></div>`).join("")}</div>`}

function learning(){return shell("LEARNING HUB","Recommended Learning","Resources selected for your current roadmap stage","<button class='btn primary' onclick='showToast(\"Today's learning plan started\")'>Start today's plan</button>")+`<div class="grid three">${[["Statistics for ML","Core concept",40,"Σ"],["Python for Data Science","Skill building",75,"Py"],["Machine Learning Fundamentals","Upcoming",15,"ML"]].map(x=>`<div class="card"><div class="cover" style="height:78px;font-size:23px">${x[3]}</div><b style="font-size:11px">${x[0]}</b><p style="font-size:8px;color:var(--muted)">${x[1]}</p>${bar(x[2])}<div style="font-size:8px;color:var(--muted);margin-top:6px">${x[2]}% complete</div><button class="btn secondary" style="width:100%;margin-top:12px" onclick='showToast("Opening resources")'>Explore resources</button></div>`).join("")}</div>`}

function progress(){return shell("ANALYTICS","Your Progress","See how consistently you're moving toward your career goal")+`<div class="grid stats">${stats("◔","Roadmap Complete","42%","↑ 8% this month")}${stats("◷","Learning Hours","34.5h","↑ 6.2h this week")}${stats("✓","Tasks Completed","38","12 this month")}${stats("🔥","Current Streak","7 days","Keep going!")}</div><div class="grid two" style="margin-top:15px"><div class="card">${head("Weekly learning activity","Hours spent learning")}<div class="chart">${[35,55,40,78,62,90,47].map((v,i)=>`<div class="col"><i style="height:${v}%"></i><span>${"MTWTFSS"[i]}</span></div>`).join("")}</div></div><div class="card">${head("Semester progress","8-semester journey")}${[["Sem 1",100],["Sem 2",100],["Sem 3",58],["Sem 4",0],["Sem 5",0]].map(x=>`<div style="margin:13px 0"><div style="display:flex;justify-content:space-between;font-size:8px;margin-bottom:5px">${x[0]}<b>${x[1]}%</b></div>${bar(x[1])}</div>`).join("")}</div></div>`}

function career(){return shell("CAREER INTELLIGENCE","Career Readiness","Understand your skill gaps and what employers expect","<button class='btn primary' onclick='showToast(\"Career analysis refreshed\")'>✦ Analyze</button>")+`<div class="career-grid"><div class="card career-dark">${head("TARGET CAREER",state.target)}<div class="score">64%</div><div class="careerbar"><i></i></div><p style="font-size:8px;color:#c1c5d4">Strong programming foundation. Focus next on Statistics, ML and deployment.</p></div><div class="card">${head("Career matches","Based on your current profile")}${[["AI/ML Engineer","64%"],["Data Scientist","58%"],["Software Engineer","73%"],["Data Analyst","69%"]].map(x=>`<div class="career-match"><div class="match-icon">↗</div><div><h4>${x[0]}</h4><small>Skill profile match</small></div><span class="match-score">${x[1]}</span></div>`).join("")}</div></div><div class="grid two" style="margin-top:15px"><div class="card">${head("Skill gap analysis","Highest-priority gaps")}${[["Deep Learning","Critical",""],["Model Deployment","Critical",""],["Statistics","Moderate","o"],["NLP","Moderate","o"]].map(x=>`<div class="gap"><i class="gap-dot ${x[2]}"></i><div><b>${x[0]}</b><small>${x[1]} gap · recommended next</small></div><button class="link" style="margin-left:auto" onclick="go('roadmap')">Fix →</button></div>`).join("")}</div><div class="card">${head("Recommended sequence","Personalized next steps")}${["Complete Statistics","Build an ML project","Learn Deep Learning","Practice deployment"].map((x,i)=>`<div class="road ${i===0?"current":""}"><div class="road-dot">${i+1}</div><div><strong>${x}</strong><p>${i===0?"Unlocks ML fundamentals":"Builds career readiness."}</p></div></div>`).join("")}</div></div>`}

function cv(){return shell("CAREER TOOL","CV Analyzer","Compare your resume against your target career and discover missing skills")+`<div class="grid cv-grid"><div class="card"><div class="drop"><div class="upload">↑</div><h3>Upload your CV</h3><p>PDF or DOCX • We'll analyze skills, projects and career alignment.</p><input id="cv" type="file" accept=".pdf,.doc,.docx" hidden><button class="btn primary" onclick="document.getElementById('cv').click()">Choose file</button></div></div><div class="card">${head("CV score","Demo analysis")}<div class="score-ring"><span>72</span></div><div style="text-align:center;font-size:8px;color:var(--muted)">Good foundation · 4 improvements recommended</div>${[["Skills detected","8"],["Projects detected","3"],["Missing career skills","4"]].map(x=>`<div class="setting"><div><b>${x[0]}</b></div><b>${x[1]}</b></div>`).join("")}</div></div><div class="grid two" style="margin-top:15px"><div class="card">${head("Detected skills","From your CV")}<div class="chips">${["Python","Java","HTML/CSS","JavaScript","Git/GitHub","C","SQL","Pandas"].map(x=>`<span class="chip" style="background:#e8f8f0;color:#16865c">✓ ${x}</span>`).join("")}</div></div><div class="card">${head("Missing for your target","Career comparison")}<div class="chips">${["Machine Learning","Statistics","Deep Learning","Deployment"].map(x=>`<span class="chip" style="background:#fff0ef;color:#d34c48">+ ${x}</span>`).join("")}</div></div></div>`}

function mentor(){return shell("PERSONAL AI","AI Mentor","Ask questions about your roadmap, skills, projects and career")+`<div class="card mentor"><div class="chat-side"><b>RECENT CHATS</b>${["What should I learn next?","ML project ideas","Internship preparation","Explain my skill gap"].map((x,i)=>`<div class="chat-item ${i===0?"active":""}">${x}</div>`).join("")}</div><div class="chat"><div class="chat-head"><div class="orb">✦</div><div><b>SkillPath AI Mentor</b><div class="online">● Personalized to your profile</div></div></div><div class="messages" id="messages"><div class="msg ai">Hi ${state.name.split(" ")[0]}! 👋 Based on your ${state.year} ${state.branch} profile and <b>${state.target}</b> goal, your next priority is <b>Statistics</b>. Ask me anything about your roadmap.</div></div><div class="suggestions">${["What should I learn next?","Why Statistics?","Which project should I build?","Am I internship ready?"].map(x=>`<button onclick="ask('${x}')">${x}</button>`).join("")}</div><div class="chat-input"><input id="chatInput" placeholder="Ask your AI mentor..." onkeydown="if(event.key==='Enter')send()"><button class="send" onclick="send()">↑</button></div></div></div>`}

function notifications(){return shell("UPDATES","Notifications","Stay on top of your learning journey")+`<div class="card">${[["🎯","Next skill unlocked","Statistics is now your highest-priority recommendation.","10 min ago"],["🚀","New project recommended","Spam Email Detection matches your current level.","2 hours ago"],["🔥","7-day streak","You've learned consistently for 7 days.","Yesterday"],["📄","CV improvement","Your CV is missing 4 skills for your target role.","Yesterday"]].map(n=>`<div class="setting"><div><b>${n[0]} ${n[1]}</b><p>${n[2]}</p></div><small style="color:#999">${n[3]}</small></div>`).join("")}</div>`}
function profile(){return shell("ACCOUNT","Profile","Your student profile and learning preferences")+`<div class="card"><div class="profile"><div class="large-avatar">KP</div><div><h2>${state.name}</h2><p>${state.branch} · ${state.year}</p><div class="chips"><span class="chip">${state.target}</span><span class="chip">7 day streak</span></div></div></div><div class="grid two" style="margin-top:25px"><div>${head("Academic information")}<div class="setting"><div><b>Branch</b><p>${state.branch}</p></div></div><div class="setting"><div><b>Year</b><p>${state.year}</p></div></div></div><div>${head("Career preference")}<div class="setting"><div><b>Target career</b><p>${state.target}</p></div></div><div class="setting"><div><b>Learning style</b><p>Project-based + visual</p></div></div></div></div></div>`}
function settings(){return shell("PREFERENCES","Settings","Customize your SkillPath experience")+`<div class="card">${[["Smart recommendations","Continuously update recommendations using progress.",true],["Learning reminders","Remind me about today's learning plan.",true],["Career alerts","Notify me about relevant opportunities.",false],["Weekly progress report","Receive a weekly learning summary.",true]].map(x=>`<div class="setting"><div><b>${x[0]}</b><p>${x[1]}</p></div><button class="switch ${x[2]?"on":""}" onclick="this.classList.toggle('on')"><i></i></button></div>`).join("")}</div>`}

const pages={dashboard,roadmap,skills:skillsPage,projects:projectsPage,learning,progress,career,cv,mentor,notifications,profile,settings};
function go(name){page.innerHTML=pages[name]();document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.page===name));document.getElementById("crumb").innerHTML=`Workspace / <b>${name.replace(/\b\w/g,x=>x.toUpperCase())}</b>`;document.getElementById("sidebar").classList.remove("open");window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll(".nav[data-page]").forEach(n => {
    n.addEventListener("click", () => go(n.dataset.page));
});
const logoutBtn=document.getElementById("logoutBtn");
if(logoutBtn) logoutBtn.addEventListener("click",logoutUser);
function toggleSide(){document.getElementById("sidebar").classList.toggle("open")}
function showToast(t){toast.textContent=t;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200)}
function showModal(h){box.innerHTML=h;modal.classList.add("show")}
function closeModal(){modal.classList.remove("show")}
modal.onclick=e=>{if(e.target===modal)closeModal()}
function skillModal(){showModal(`<button class="close" onclick="closeModal()">×</button><div class="eyebrow">NEXT SKILL</div><h2>Statistics for Machine Learning</h2><p>Statistics is your highest-priority next skill based on your current roadmap and ${state.target} goal.</p><div class="card" style="background:#fafaff;box-shadow:none"><b style="font-size:9px">Learning plan</b><p>Probability → distributions → descriptive statistics → hypothesis testing → model evaluation.</p></div><button class="btn primary" onclick="closeModal();showToast('Statistics added to today’s plan')">Add to today's plan</button>`)}
function projectModal(t,d,l,time){showModal(`<button class="close" onclick="closeModal()">×</button><div class="eyebrow">AI RECOMMENDED PROJECT</div><h2>${t}</h2><p>${d}. This project is matched to your current skills and ${state.target} goal.</p><div class="chips"><span class="chip">${l}</span><span class="chip">${time}</span><span class="chip">AI/ML</span></div><h3 style="font-size:11px;margin-top:18px">Suggested milestones</h3><p>1. Learn prerequisites → 2. Build baseline → 3. Add features → 4. Test → 5. Document on GitHub</p><button class="btn primary" onclick="closeModal();showToast('Project added to your roadmap')">Add to My Roadmap</button>`)}
function send(){const input=document.getElementById("chatInput"),text=input.value.trim();if(!text)return;const m=document.getElementById("messages");m.innerHTML+=`<div class="msg user">${text}</div>`;input.value="";setTimeout(()=>{let a="Follow your roadmap in prerequisite order and focus on one skill at a time.";if(/next|learn/i.test(text))a="Your next recommended skill is <b>Statistics</b>. It has high relevance to your AIML goal and unlocks Machine Learning Fundamentals.";if(/project/i.test(text))a="I recommend <b>Spam Email Detection</b>. It lets you practice NLP, TF-IDF, Naive Bayes and model evaluation.";if(/internship/i.test(text))a="Build one strong end-to-end project, publish it on GitHub, strengthen ML fundamentals and use the CV Analyzer before applying.";m.innerHTML+=`<div class="msg ai">${a}</div>`;m.scrollTop=m.scrollHeight},450)}
function ask(x){document.getElementById("chatInput").value=x;send()}
function openSearch(){showModal(`<button class="close" onclick="closeModal()">×</button><div class="eyebrow">GLOBAL SEARCH</div><h2>Search SkillPath AI</h2><p>Search skills, projects, roadmap stages or career paths.</p><input autofocus placeholder="Try: Machine Learning" style="width:100%;height:43px;border:1px solid var(--line);border-radius:10px;padding:0 11px;font-size:10px">`)}

document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openSearch()}});
document.getElementById("cv")?.addEventListener("change",()=>showToast("CV uploaded — demo analysis complete"));
