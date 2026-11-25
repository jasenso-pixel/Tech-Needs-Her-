const $=s=>document.querySelector(s);
const esc=t=>t.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// Decorative QR-style pattern
(()=>{let s=7,r=()=>(s=s*16807%2147483647)/2147483647,h='';
const fin=(x,y)=>{const a=x<7&&y<7,b=x>13&&y<7,c=x<7&&y>13;if(!(a||b||c))return null;const lx=a||c?x:x-14,ly=a||b?y:y-14;return(lx==0||lx==6||ly==0||ly==6||(lx>1&&lx<5&&ly>1&&ly<5))?1:0};
for(let y=0;y<21;y++)for(let x=0;x<21;x++){const f=fin(x,y);if(f===1||(f===null&&r()>.52))h+=`<rect x="${x}" y="${y}" width="1" height="1" fill="#111"/>`}
$('#qr').innerHTML=h})();

// Belonging wall
const names=[['Juanita','Current student'],['Idil','Current student'],['Noga','Current student'],];
function drawWall(){$('#wallChips').innerHTML=names.map(n=>`<span class="chip">${esc(n[0])} · ${esc(n[1])}</span>`).join('')}
$('#wallForm').addEventListener('submit',e=>{e.preventDefault();names.unshift([$('#wallName').value.trim(),$('#wallRole').value]);$('#wallName').value='';drawWall()});
drawWall();

// Mentor form
$('#mForm').addEventListener('submit',e=>{e.preventDefault();
$('#mOut').innerHTML=`<b>Request received.</b> You signed up as a ${esc($('#mRole').value.toLowerCase())} (${esc($('#mYear').value.toLowerCase())}) interested in ${esc($('#mTopic').value.toLowerCase())}. We’ll email ${esc($('#mMail').value)} when we find your match.`});

// Mentor catalog
const mentors=[['A','Mentor A','Computer science · Senior','Software engineering. Happy to talk internships, interviews, and surviving data structures.'],
['B','Mentor B','Information science · Alumna','Product and design. Two years into a first job and glad to share what she wishes she had known.'],
['C','Mentor C','Electrical engineering · Graduate','Hardware and robotics. Research lab experience and grad school advice.']];
$('#mc').innerHTML=mentors.map((m,i)=>`<div class="mrow"><div class="av" aria-hidden="true">${m[0]}</div><div><b>${m[1]}</b><small>${m[2]}</small></div><button class="btn ghost sm" data-m="${i}" aria-expanded="false">View profile</button></div><div class="more" id="m${i}">${m[3]}</div>`).join('');
$('#mc').addEventListener('click',e=>{const i=e.target.dataset.m;if(i===undefined)return;const o=$('#m'+i).classList.toggle('on');e.target.setAttribute('aria-expanded',o);e.target.textContent=o?'Hide profile':'View profile'});

// Clubs
const clubs=[
['Technica','The largest all-women and nonbinary hackathon, run by UMD students.','Hackathons','Software'],
['Women in Computing','Peer community, study groups, and industry connections for women in CS.','Community','Software'],
['Girls Who Code UMD','Building community in computer science, with workshops and outreach.','Community','Software'],
['Society of Women Engineers','Professional development, outreach, and a national network.','Community','Hardware'],
['Women in Engineering','Support, scholarships, and programs across the engineering college.','Community','Hardware'],
['Cybersecurity Club','Capture-the-flag practice and workshops open to all levels.','Cybersecurity','Hackathons'],
['Data Science Club','Projects, speakers, and study sessions on data and machine learning.','Data and AI','Software']];
const cats=['All','Community','Hackathons','Software','Cybersecurity','Data and AI','Hardware'];
let cur='All';
function drawClubs(){
$('#cf').innerHTML=cats.map(c=>`<button aria-pressed="${c===cur}" data-c="${c}">${c}</button>`).join('');
$('#cg').innerHTML=clubs.filter(c=>cur==='All'||c.slice(2).includes(cur)).map((c,i)=>`<div class="card"><h3>${c[0]}</h3><p>${c[1]}</p>${c.slice(2).map(t=>`<span class="tag">${t}</span>`).join('')}<br><button class="btn ghost sm" data-l="${i}">Learn more</button><div class="more" id="l${i}">Sample listing. Add this club’s website, meeting time, and contact here.</div></div>`).join('')}
$('#cf').addEventListener('click',e=>{if(e.target.dataset.c){cur=e.target.dataset.c;drawClubs()}});
$('#cg').addEventListener('click',e=>{const i=e.target.dataset.l;if(i!==undefined)$('#l'+i).classList.toggle('on')});
drawClubs();

// Programs
const progs=[['Technica workshops','Hands-on sessions that prepare you for the hackathon, no experience needed.','Workshop'],
['Girls Who Code info sessions','Learn how to join, volunteer, or start a chapter.','Outreach'],
['Scholarships and funding','A running list of awards for women in computing and engineering.','Funding']];
$('#pg').innerHTML=progs.map(p=>`<div class="card"><h3>${p[0]}</h3><p>${p[1]}</p><span class="tag">${p[2]}</span></div>`).join('');

// Reminders and ways
const rem=[['Technica applications open','Due Dec 1'],['Girls Who Code info session','Dec 4'],['Scholarship deadline','Dec 15']];
$('#rem').innerHTML=rem.map(r=>`<div class="item"><span>${r[0]}</span><small>${r[1]}</small></div>`).join('');
const ways=[['Volunteer','Help run events, workshops, and outreach days.'],['Speak or join a panel','Share your path with students who are a few steps behind you.'],['Mentor or be mentored','Use the matching form above to sign up for this semester.']];
$('#ways').innerHTML=ways.map((w,i)=>`<a class="item" href="#" data-w="${i}"><span>${w[0]}</span><small>›</small></a>`).join('');
$('#ways').addEventListener('click',e=>{const a=e.target.closest('[data-w]');if(!a)return;e.preventDefault();const o=$('#wayOut');o.hidden=false;o.textContent=ways[a.dataset.w][1]});

// Stories
const stories=[
['Maya, junior in computer science','Switched majors after her first coding class','I started in biology and took one intro programming course to fill a requirement. I was the only woman in my row and almost didn’t come back. A teaching assistant told me my question was a good one, and that was enough to keep going. Two years later I’m building apps for a campus research lab.'],
['Priya, senior in information science','From imposter syndrome to a first internship','I applied to 40 internships and got one interview. What changed was practicing with other women in a club, out loud, until the nerves wore off. My advice: find your people before you need them.'],
['Aisha, alumna and software engineer','Building a career after graduation','Nobody on my first team looked like me, so I joined a women-in-tech group outside work. It gave me mentors, a salary conversation I needed, and a reminder that I’m not the exception.']];
$('#sg').innerHTML=stories.map(s=>`<details><summary>${s[0]}<small>${s[1]}</small></summary><p style="margin:14px 0 0;max-width:42rem">${s[2]}</p></details>`).join('');

// Events
const ev=[['DEC','02','Study night and snacks','Finals prep with upperclass mentors. Bring your own problem set.'],
['JAN','24','Resume and portfolio workshop','Get feedback from industry recruiters in small groups.'],
['FEB','14','Technica hackathon','A weekend of building, workshops, and meeting new teammates.'],
['MAR','05','Women in tech panel','Alumnae answer your questions about internships and first jobs.'],
['MAR','12','Networking night','Meet students, alumnae, and recruiters over snacks.'],
['MAR','20','Technica workshop','Build your first project with a team before the next hackathon.']];
const going=new Set();
function drawEv(){$('#eg').innerHTML=ev.map((x,i)=>`<div class="ev"><div class="date"><small>${x[0]}</small>${x[1]}</div><div><h3>${x[2]}</h3><p>${x[3]}</p></div><button class="btn ${going.has(i)?'pink':'ghost'}" data-i="${i}" aria-pressed="${going.has(i)}">${going.has(i)?'You’re going':'RSVP'}</button></div>`).join('')}
$('#eg').addEventListener('click',e=>{const i=e.target.dataset.i;if(i!==undefined){going.has(+i)?going.delete(+i):going.add(+i);drawEv()}});
drawEv();
// Calendar: March 2027 starts on a Monday
const mar=ev.filter(x=>x[0]==='MAR'),days=mar.map(x=>+x[1]);
$('#cal').innerHTML=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>`<b>${d}</b>`).join('')+'<span style="border:0"></span>'+Array.from({length:31},(_,i)=>`<span class="${days.includes(i+1)?'has':''}"${days.includes(i+1)?` title="${esc(mar[days.indexOf(i+1)][2])}"`:''}>${i+1}</span>`).join('');
$('#marEv').innerHTML=mar.map(x=>`<a class="item" href="#eg"><span>${x[2]}</span><small>Mar ${+x[1]}</small></a>`).join('');

// Facts
const facts=['Ada Lovelace wrote what many consider the first computer program, in the 1840s.',
'The first programmers of the ENIAC computer in the 1940s were six women.',
'Grace Hopper helped create COBOL and popularized the idea of programming in English-like words.',
'Katherine Johnson’s orbital calculations helped send American astronauts into space.',
'Hedy Lamarr co-invented frequency hopping, an idea behind modern Wi-Fi and Bluetooth.'];
let fi=0;$('#fact').textContent=facts[0];
$('#factBox').addEventListener('click',()=>{fi=(fi+1)%facts.length;const f=$('#fact');f.textContent=facts[fi];f.classList.remove('pop');void f.offsetWidth;f.classList.add('pop')});

// Background video
const VIDEO_SRC='umd-women-in-tech.mp4'; // put your video file next to tnh2.html
const vid=$('#bgv');
if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
  vid.muted=true;
  const go=()=>vid.play().then(()=>vid.classList.add('on')).catch(()=>{});
  vid.addEventListener('canplay',go);
  vid.addEventListener('pause',()=>{if(!document.hidden&&!vid.ended)go()});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)go()});
  ['pointerdown','keydown','touchstart'].forEach(t=>addEventListener(t,()=>{if(vid.paused)go()},{passive:true}));
  vid.addEventListener('error',()=>{console.warn('Background video failed to load:',VIDEO_SRC);vid.remove()});
  vid.src=VIDEO_SRC;
}

// Fade the background as people scroll, down to a minimum (never fully gone)
const MIN_FADE=0.15; // 0.25 = video still shows at 25% of its strength at the bottom of the page
let tick=false;
function fade(){tick=false;const max=document.documentElement.scrollHeight-innerHeight,p=max>0?Math.min(scrollY/max,1):0;document.documentElement.style.setProperty('--vo',(1-(1-MIN_FADE)*p).toFixed(3))}
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(fade)}},{passive:true});
fade();