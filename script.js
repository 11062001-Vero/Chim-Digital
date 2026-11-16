/* ChimáDigital - prototipo académico */
const firebaseConfig = {
  apiKey: "AIzaSyDEZTuzYOjAsuAd_IVUwV7UXULw0aTCRwU",
  authDomain: "chimadigital-9558a.firebaseapp.com",
  projectId: "chimadigital-9558a",
  appId: "1:430388907065:web:05ed41262b06e10f6651e8"
};
let firebaseReady=false, authMode="register", currentUser=null, diagIndex=0, diagAnswers={};
const diagnostic=[
 {area:"Herramientas digitales",q:"¿Qué debes hacer para crear un documento de texto en un computador?",a:["Abrir un programa de edición de texto, como Word o Documentos de Google.","Apagar el computador.","Abrir únicamente la calculadora."],correct:0},
 {area:"Herramientas digitales",q:"¿Para qué sirve un navegador web?",a:["Para navegar por páginas y sitios de Internet.","Para cargar la batería.","Para imprimir sin conexión."],correct:0},
 {area:"Búsqueda de información",q:"¿Qué ayuda a encontrar información más precisa en Internet?",a:["Escribir palabras clave relacionadas con el tema.","Escribir cualquier palabra sin relación.","Elegir siempre el primer anuncio."],correct:0},
 {area:"Búsqueda de información",q:"¿Cómo puedes valorar si una información es confiable?",a:["Comparar fuentes, revisar autoría y fecha.","Creerla porque tiene muchos colores.","Compartirla sin leerla."],correct:0},
 {area:"Comunicación digital",q:"¿Qué elemento es importante al enviar un correo electrónico?",a:["Escribir un asunto claro y un mensaje respetuoso.","Dejar vacío el destinatario.","Compartir la contraseña."],correct:0},
 {area:"Comunicación digital",q:"¿Qué debes hacer si necesitas enviar un documento por correo?",a:["Adjuntar el archivo antes de enviar.","Escribir la contraseña en el asunto.","Enviar un mensaje sin destinatario."],correct:0},
 {area:"Seguridad digital",q:"¿Cuál es una práctica adecuada para proteger una cuenta?",a:["Usar una contraseña larga y diferente para cada servicio.","Usar 123456 en todas las cuentas.","Compartir la contraseña con conocidos."],correct:0},
 {area:"Seguridad digital",q:"¿Qué debes hacer si recibes un enlace sospechoso que solicita tus datos?",a:["No abrirlo y verificar el remitente por otro medio.","Ingresar tus datos inmediatamente.","Reenviarlo a todos tus contactos."],correct:0}
];
const modules=[
 {id:1,title:"Manejo básico de herramientas digitales",icon:"▣",desc:"Aprende a utilizar dispositivos, aplicaciones, documentos y archivos.",lesson:"Reconoce tu dispositivo y crea documentos",content:"Las herramientas digitales permiten realizar tareas cotidianas. Un computador o teléfono tiene aplicaciones para escribir, consultar información y organizar archivos.",example:"Ejemplo: para redactar una carta, abre un procesador de texto, escribe el contenido y guarda el archivo con un nombre fácil de reconocer.",activity:{q:"Estás elaborando una hoja de vida. ¿Qué herramienta elegirías para escribir y organizar el texto?",opts:["Procesador de texto","Reproductor de música","Calculadora"],correct:0,explain:"Un procesador de texto permite escribir, editar y organizar documentos."},quiz:[["¿Qué acción permite conservar un documento?",["Guardarlo","Cerrar sin guardar","Apagar el equipo"],0],["¿Qué es una carpeta digital?",["Un espacio para organizar archivos","Un navegador","Una contraseña"],0],["¿Qué aplicación sirve para visitar páginas web?",["Navegador","Calculadora","Bloc de notas"],0]]},
 {id:2,title:"Búsqueda y Gestión de Información",icon:"⌕",desc:"Busca información, compara fuentes y organiza archivos digitales.",lesson:"Estrategias para buscar información confiable",content:"Una búsqueda efectiva comienza con palabras clave. Para evaluar resultados revisa quién publica, cuándo se publicó y si otras fuentes confiables respaldan la información.",example:"Ejemplo: para investigar un trámite, consulta páginas oficiales de entidades públicas y compara la información antes de compartirla.",activity:{q:"Necesitas información sobre un trámite municipal. ¿Cuál fuente deberías consultar primero?",opts:["Sitio oficial de la entidad pública","Una publicación anónima sin fecha","Un anuncio sin referencias"],correct:0,explain:"Las páginas oficiales permiten consultar información institucional y verificable."},quiz:[["¿Qué son palabras clave?",["Términos centrales de una búsqueda","Contraseñas","Nombres de archivos"],0],["¿Qué dato ayuda a evaluar actualidad?",["Fecha de publicación","Color de la página","Cantidad de emojis"],0],["¿Qué conviene hacer antes de compartir una noticia?",["Verificarla en otras fuentes","Compartirla de inmediato","Cambiarle el título"],0]]},
 {id:3,title:"Comunicación y Colaboración Digital",icon:"▢",desc:"Utiliza el correo electrónico y comunícate de forma respetuosa.",lesson:"Correo electrónico y comunicación responsable",content:"El correo electrónico permite enviar mensajes y archivos. Un mensaje claro incluye destinatario correcto, asunto, saludo, explicación breve y despedida.",example:"Ejemplo de asunto: Solicitud de información sobre matrícula. Antes de enviar, verifica la dirección del destinatario y que el archivo esté adjunto.",activity:{q:"Vas a enviar una tarea a tu tutor. ¿Qué debes revisar antes de pulsar Enviar?",opts:["Destinatario, asunto, mensaje y archivo adjunto","Solo el color del correo","Que la contraseña aparezca en el mensaje"],correct:0,explain:"Revisar estos elementos evita errores y protege tu información."},quiz:[["¿Para qué sirve el asunto?",["Indicar el tema del mensaje","Guardar la contraseña","Adjuntar automáticamente"],0],["¿Qué tono es adecuado en un correo académico?",["Respetuoso y claro","Ofensivo","Confuso"],0],["¿Qué indica el clip en muchos correos?",["Adjuntar un archivo","Eliminar la cuenta","Cerrar sesión"],0]]},
 {id:4,title:"Seguridad Digital y Protección de Datos",icon:"⬡",desc:"Protege tus cuentas, dispositivos e información personal.",lesson:"Contraseñas seguras y prevención de riesgos",content:"La seguridad digital requiere contraseñas robustas, cuidado con enlaces desconocidos y protección de los datos personales. No compartas códigos de verificación ni claves.",example:"Ejemplo: si un mensaje afirma que tu cuenta será bloqueada y exige tu contraseña mediante un enlace, no ingreses. Entra directamente al sitio oficial para verificar.",activity:{q:"Recibes un mensaje que solicita tu clave bancaria para evitar el bloqueo de tu cuenta. ¿Qué haces?",opts:["No comparto la clave y contacto al banco por canales oficiales","Respondo con mi clave","Reenvío el mensaje a mis contactos"],correct:0,explain:"Las entidades no deben pedirte tu contraseña por mensajes. Verifica siempre por canales oficiales."},quiz:[["¿Cómo debe ser una contraseña segura?",["Larga, única y difícil de adivinar","Tu fecha de nacimiento","123456"],0],["¿Qué haces con un enlace sospechoso?",["No lo abro y verifico el remitente","Lo abro y escribo mis datos","Lo reenvío"],0],["¿Qué dato no debes compartir?",["Código de verificación","Nombre de una aplicación pública","Horario de atención público"],0]]}
];
const $=id=>document.getElementById(id);
function loadState(){try{return JSON.parse(localStorage.getItem("cd_state")||"{}")}catch{return{}}}
function saveState(){localStorage.setItem("cd_state",JSON.stringify(state))}
let state=loadState();
function setView(id){document.querySelectorAll("main>.view").forEach(v=>v.classList.add("hidden"));$(id).classList.remove("hidden");window.scrollTo(0,0)}
function notice(id,msg,ok=false){const el=$(id);el.textContent=msg;el.style.color=ok?"#238343":""}
function initFirebase(){
  const configIsReady = Object.values(firebaseConfig).every(
    value => value && !String(value).startsWith("PEGA_AQUI_")
  );

  if (!configIsReady || !window.firebase) {
    firebaseReady = false;
    return;
  }

  try {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    firebaseReady = true;

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .catch(error => console.warn("No se pudo establecer la persistencia:", error));

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        currentUser = {
          name: user.displayName || (user.email ? user.email.split("@")[0] : "Estudiante"),
          email: user.email || "",
          age: "",
          provider: user.providerData?.[0]?.providerId === "google.com" ? "Google" : "Correo"
        };
        afterLogin(false);
      }
    });
  } catch (error) {
    firebaseReady = false;
    console.error("Error al inicializar Firebase:", error);
  }
}
function renderAuth(){const login=authMode==="login";$("authTitle").textContent=login?"Inicia sesión en ChimáDigital":"Bienvenido a la Plataforma de Competencias Digitales de Chimá";$("nameGroup").classList.toggle("hidden",login);$("ageGroup").classList.toggle("hidden",login);$("fullName").required=!login;$("ageRange").required=!login;$("authSubmit").innerHTML=login?"Iniciar sesión <span>➜</span>":"Crear cuenta e iniciar diagnóstico <span>➜</span>";$("switchText").innerHTML=login?'¿No tienes una cuenta? <button class="text-btn" id="switchAuth">Regístrate</button>':'¿Ya tienes una cuenta? <button class="text-btn" id="switchAuth">Inicia sesión</button>'; $("switchAuth").onclick=()=>{authMode=login?"register":"login";renderAuth();notice("authNotice","")}}
$("authForm").addEventListener("submit",async e=>{e.preventDefault();notice("authNotice","");const email=$("email").value.trim().toLowerCase(),password=$("password").value;if(firebaseReady){try{let cred;if(authMode==="register"){cred=await firebase.auth().createUserWithEmailAndPassword(email,password);await cred.user.updateProfile({displayName:$("fullName").value.trim()})}else{cred=await firebase.auth().signInWithEmailAndPassword(email,password)}currentUser={name:cred.user.displayName||$("fullName").value||email.split("@")[0],email,age:$("ageRange").value,provider:"Correo"};afterLogin(authMode==="register");return}catch(err){notice("authNotice",friendlyError(err));return}}
if(authMode==="register"){currentUser={name:$("fullName").value.trim(),email,age:$("ageRange").value,provider:"Modo demostración"};state={user:currentUser,answers:state.answers||{},modules:state.modules||{},diagnosticDone:false};saveState();afterLogin(true)}else{if(!state.user||state.user.email!==email){notice("authNotice","En modo demostración, primero crea una cuenta en este navegador.");return}currentUser=state.user;afterLogin(false)}});
function friendlyError(e){return e.code==="auth/email-already-in-use"?"Este correo ya tiene una cuenta. Inicia sesión.":e.code==="auth/weak-password"?"La contraseña debe tener al menos 6 caracteres.":e.code==="auth/invalid-credential"?"Correo o contraseña incorrectos.":e.message||"No se pudo iniciar sesión."}
$("googleBtn").onclick = async () => {
  notice("authNotice", "");

  if (!firebaseReady) {
    notice("authNotice", "Primero configura los datos de tu proyecto Firebase en script.js y activa Google en Authentication > Sign-in method.");
    return;
  }

  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;

    currentUser = {
      name: user.displayName || (user.email ? user.email.split("@")[0] : "Estudiante"),
      email: user.email || "",
      age: "",
      provider: "Google"
    };

    afterLogin(!state.diagnosticDone);
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      notice("authNotice", "Cerraste la ventana de Google antes de completar el acceso.");
    } else if (error.code === "auth/popup-blocked") {
      notice("authNotice", "El navegador bloqueó la ventana emergente. Permite las ventanas emergentes e inténtalo de nuevo.");
    } else {
      notice("authNotice", friendlyError(error));
    }
    console.error("Error de autenticación con Google:", error);
  }
};
function afterLogin(needsDiagnostic){state.user=currentUser;saveState();if(!state.diagnosticDone){startDiagnostic()}else{showDashboard("home")}}
function startDiagnostic(){diagIndex=0;diagAnswers=state.answers||{};setView("diagnosticView");renderDiagnostic()}
function renderDiagnostic(){const q=diagnostic[diagIndex],chosen=diagAnswers[diagIndex];$("diagCount").textContent=`Pregunta ${diagIndex+1} de ${diagnostic.length}`;$("diagPercent").textContent=`${Math.round((diagIndex+1)/diagnostic.length*100)}% completado`;$("diagBar").style.width=`${(diagIndex+1)/diagnostic.length*100}%`;$("questionArea").innerHTML=`<span class="tag">${q.area}</span><h3>${q.q}</h3><p>Selecciona una sola respuesta.</p><div class="answers">${q.a.map((a,i)=>`<label class="answer-option ${chosen===i?"selected":""}"><input type="radio" name="diagAnswer" value="${i}" ${chosen===i?"checked":""}> ${String.fromCharCode(65+i)}. ${a}</label>`).join("")}</div>`;document.querySelectorAll('input[name="diagAnswer"]').forEach(inp=>inp.onchange=()=>{diagAnswers[diagIndex]=Number(inp.value);renderDiagnostic()});$("diagPrev").disabled=diagIndex===0;$("diagPrev").style.opacity=diagIndex===0?".4":"1";$("diagNext").textContent=diagIndex===diagnostic.length-1?"Finalizar diagnóstico ✓":"Siguiente pregunta ➜";notice("diagNotice","")}
$("diagPrev").onclick=()=>{if(diagIndex>0){diagIndex--;renderDiagnostic()}};$("diagNext").onclick=()=>{if(diagAnswers[diagIndex]===undefined){notice("diagNotice","Selecciona una respuesta para continuar.");return}if(diagIndex<diagnostic.length-1){diagIndex++;renderDiagnostic()}else{const score=diagnostic.filter((q,i)=>diagAnswers[i]===q.correct).length;state.answers=diagAnswers;state.diagnosticDone=true;state.diagnosticScore=Math.round(score/diagnostic.length*100);saveState();$("diagnosticScore").textContent=state.diagnosticScore+"%";$("diagnosticSummary").textContent="Tus respuestas nos ayudan a identificar temas que puedes reforzar. Puedes comenzar por cualquiera de los cuatro módulos.";setView("diagnosticResultView")}};
$("goDashboard").onclick=()=>showDashboard("home");
function showDashboard(page){setView("dashboardView");$("userName").textContent=(currentUser?.name||state.user?.name||"Estudiante").split(" ")[0];$("profileName").textContent=currentUser?.name||state.user?.name||"Estudiante";$("profileEmail").textContent=currentUser?.email||state.user?.email||"";$("profileAge").textContent=(currentUser?.age||state.user?.age)?`Rango de edad: ${currentUser?.age||state.user.age}`:"";renderDashboard();goPage(page)}
function progressData(){let done=0,activities=0;modules.forEach(m=>{const p=state.modules?.[m.id]||{};if(p.done)done++;if(p.activityDone)activities++});return{done,activities,percent:Math.round(done/4*100)}}
function moduleCard(m){const p=state.modules?.[m.id]||{},status=p.done?"Completado":p.started?"En curso":m.id===1?"Disponible":"Disponible";return `<article class="module-card"><div class="module-top"><span class="module-icon">${m.icon}</span><span class="status ${p.done?"done":p.started?"current":""}">${p.done?"✓":p.started?"◷":"○"} ${status}</span></div><h3>${m.title}</h3><p>${m.desc}</p><div class="mini-progress"><i style="width:${p.done?100:p.activityDone?55:p.started?20:0}%"></i></div><button class="btn ${p.done?"light":"primary"}" onclick="openModule(${m.id})">${p.done?"Repasar módulo":"Abrir módulo"} ➜</button></article>`}
function renderDashboard(){const p=progressData();$("completedCount").textContent=`${p.done} de 4`;$("progressPercent").textContent=p.percent+"%";$("activitiesCount").textContent=p.activities+" de 4";$("moduleGrid").innerHTML=modules.slice(0,2).map(moduleCard).join("");$("allModules").innerHTML=modules.map(moduleCard).join("");$("bigProgress").textContent=p.percent+"%";$("bigProgressBar").style.width=p.percent+"%";$("progressDescription").textContent=`Has completado ${p.done} de 4 módulos y ${p.activities} actividades prácticas.`;$("progressDetails").innerHTML=modules.map(m=>{const x=state.modules?.[m.id]||{};return `<div class="progress-item"><span>${m.title}</span><b>${x.done?"Completado":x.activityDone?"Actividad realizada":x.started?"En curso":"Pendiente"}</b></div>`}).join("")}
function goPage(page){document.querySelectorAll(".page").forEach(x=>x.classList.add("hidden"));const target=page==="home"?"homePage":page==="modules"?"modulesPage":page==="progress"?"progressPage":page==="profile"?"profilePage":"lessonPage";$(target).classList.remove("hidden");document.querySelectorAll(".side-link[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));if(page!=="lesson")renderDashboard()}
document.querySelectorAll(".side-link[data-page]").forEach(b=>b.onclick=()=>goPage(b.dataset.page));document.querySelectorAll("[data-goto]").forEach(b=>b.onclick=()=>goPage(b.dataset.goto));$("brandHome").onclick=e=>{e.preventDefault();if(currentUser||state.user)showDashboard("home")};$("avatarBtn").onclick=()=>{if(currentUser||state.user)showDashboard("profile")};$("helpBtn").onclick=()=>alert("ChimáDigital te guía paso a paso. Inicia sesión, completa el diagnóstico y abre un módulo para aprender y practicar.");
function openModule(id){const m=modules.find(x=>x.id===id);if(!m)return;state.modules=state.modules||{};state.modules[id]=state.modules[id]||{started:true};state.modules[id].started=true;saveState();$("lessonContent").innerHTML=`<div class="lesson-header"><span class="section-kicker">MÓDULO ${id} · APRENDIZAJE PRÁCTICO</span><h2>${m.title}</h2><p>${m.lesson}</p></div><div class="lesson-layout"><div><article class="lesson-box"><h3>Aprende</h3><p>${m.content}</p><div class="example-box"><b>Ejemplo cotidiano</b><p>${m.example}</p></div><p><b>Recuerda:</b> realiza cada paso con calma. Puedes volver a consultar este contenido cuando lo necesites.</p></article><article class="lesson-box"><h3>Actividad práctica interactiva</h3><p>${m.activity.q}</p><div class="activity"><select id="activityAnswer"><option value="">Selecciona una respuesta</option>${m.activity.opts.map((o,i)=>`<option value="${i}">${o}</option>`).join("")}</select><button class="btn primary" id="checkActivity">Comprobar respuesta</button><div class="feedback" id="activityFeedback"></div></div></article></div><div><article class="lesson-box"><h3>Evaluación del módulo</h3><p>Responde las tres preguntas y consulta tu resultado.</p><div id="moduleQuiz">${m.quiz.map((q,i)=>`<div class="quiz-question"><b>${i+1}. ${q[0]}</b>${q[1].map((a,j)=>`<label><input type="radio" name="quiz${i}" value="${j}"> ${a}</label>`).join("")}</div>`).join("")}</div><button class="btn primary full" id="submitQuiz">Enviar evaluación</button><div class="feedback" id="quizFeedback"></div></article></div></div>`;goPage("lesson");$("checkActivity").onclick=()=>{const v=$("activityAnswer").value,fb=$("activityFeedback");if(v===""){fb.textContent="Selecciona una opción.";fb.className="feedback bad";return}const ok=Number(v)===m.activity.correct;fb.textContent=ok?"¡Muy bien! "+m.activity.explain:"Inténtalo de nuevo. "+m.activity.explain;fb.className="feedback "+(ok?"ok":"bad");if(ok){state.modules[id].activityDone=true;saveState();renderDashboard()}};$("submitQuiz").onclick=()=>{let correct=0,answered=0;m.quiz.forEach((q,i)=>{const el=document.querySelector(`input[name="quiz${i}"]:checked`);if(el){answered++;if(Number(el.value)===q[2])correct++}});const fb=$("quizFeedback");if(answered!==m.quiz.length){fb.textContent="Responde las tres preguntas antes de enviar.";fb.className="feedback bad";return}const score=Math.round(correct/m.quiz.length*100),passed=score>=67;fb.textContent=`Resultado: ${score}%. ${passed?"¡Evaluación aprobada! El módulo quedó completado.":"Puedes repasar el contenido e intentarlo nuevamente."}`;fb.className="feedback "+(passed?"ok":"bad");state.modules[id].lastScore=score;if(passed)state.modules[id].done=true;saveState();renderDashboard()}}
$("logoutBtn").onclick = $("mobileLogout").onclick = async () => {
  try {
    // En Firebase se cierra realmente la sesión del proveedor.
    if (firebaseReady && firebase.auth().currentUser) {
      await firebase.auth().signOut();

      // Evita que el usuario de Firebase quede restaurado desde localStorage.
      state.user = null;
      saveState();
    }

    currentUser = null;
    authMode = "login";
    renderAuth();

    // Limpia la contraseña y muestra nuevamente el acceso.
    $("password").value = "";
    setView("authView");
    notice("authNotice", "Has cerrado sesión correctamente.", true);
  } catch (error) {
    console.error("No se pudo cerrar la sesión:", error);
    notice("authNotice", "No se pudo cerrar la sesión. Inténtalo nuevamente.");
  }
};
initFirebase();
renderAuth();

// En modo demostración se conserva el usuario local para permitir iniciar sesión
// nuevamente. Con Firebase, la sesión solo se restaura si Firebase confirma
// que existe un usuario autenticado mediante onAuthStateChanged.
if (state.user && !firebaseReady) {
  authMode = "login";
  renderAuth();
  $("email").value = state.user.email || "";
}
setView("authView");
