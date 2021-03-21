(()=>{"use strict";class e{constructor(e){this.title=e,this.tasks=[]}setProjectName(e){this.name=e}getProjectName(){return this.name}setTasks(e){this.tasks=e}getTasks(){return this.tasks}getTask(e){return this.tasks.find((t=>t.getName()===e))}deleteTask(e){const t=this.tasks.find((t=>t.getName()===e));this.tasks.splice(this.tasks.indexOf(t),1)}addTask(e){this.tasks.indexOf(e)>0||this.tasks.push(e)}}var t=new class{constructor(){this.projects=[],this.projects.push(new e("All Tasks")),this.projects.push(new e("Today")),this.projects.push(new e("This Week"))}getProjects(){return this.projects}getProject(e){return this.projects.find((t=>t.getProjectName()===e))}addToProjectList(e){this.projects.push(e)}deleteProject(e){const t=this.projects.find((t=>t.getProjectName()===e));this.projects.splice(this.projects.indexOf(t),1)}};document.querySelector("#taskTable"),document.querySelector("#currentProject");const s=document.querySelectorAll(".project"),r=document.querySelector(".newProject"),n=document.querySelector(".project-select");document.querySelector("#addTaskBtn");var c=e=>{document.getElementById("currentProject").innerHTML=e},i=e=>{let t=document.getElementById("taskList");e.tasks.forEach((e=>{let s=document.createElement("tr");e.forEach((e=>{let t=document.createElement("td");t.innerText=e,s.appendChild(t)})),t.appendChild(s)}))};s.forEach((e=>{e.addEventListener("click",(()=>{c(e.innerHTML),i(t.getProject(e.value))}))})),r.addEventListener("click",(()=>{let s=prompt("Please Name This Project");if(""!==s){let r=new e(s);t.addToProjectList(r),((e,t)=>{var s=document.getElementById("projectList"),r=document.createElement("li"),n=document.createElement("span");n.classList.add("badge","bg-primary","rounded-pill"),n.innerHTML=t.tasks.length,r.classList.add("project","list-group-item","list-group-item-action","d-flex","justify-content-between","align-items-center"),r.href="#",r.innerHTML=e,r.appendChild(n),s.appendChild(r),r.addEventListener("click",(()=>{c(r.innerHTML.split("<span")[0]),i(t)}))})(s,r)}})),n.addEventListener("click",(()=>{let e=document.getElementById("placeholder");0!==t.length?t.projects.forEach((t=>{if("All Tasks"!==t.title&&"Today"!==t.title&&"This Week"!==t.title){n.innerHTML="";let e=document.createElement("OPTION");e.innerHTML=t.title,n.appendChild(e)}else e.innerHTML="No Projects Exist"})):e.innerHTML="No Projects Exist"}))})();