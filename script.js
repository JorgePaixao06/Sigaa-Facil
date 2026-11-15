const guides = [
  {id:"atestado",title:"Emitir atestado de matrícula",category:"documentos",categoryName:"Documentos",icon:"▤",description:"Veja como localizar e emitir um comprovante de vínculo com a instituição.",intro:"O atestado de matrícula é um documento que comprova seu vínculo acadêmico. Os nomes dos menus podem variar conforme a instituição.",steps:["Acesse o portal oficial do SIGAA da sua instituição.","Entre com suas credenciais institucionais na página oficial.","Procure a área relacionada a Ensino, Portal do Discente ou Documentos.","Localize a opção de atestado ou comprovante de matrícula.","Confira se o documento e seus dados estão corretos.","Utilize a opção de visualizar, imprimir ou baixar, se disponível."]},
  {id:"matricula",title:"Realizar matrícula em disciplinas",category:"matricula",categoryName:"Matrícula",icon:"▦",description:"Entenda os cuidados e as etapas gerais do período de matrícula.",intro:"A matrícula em disciplinas depende do calendário e das regras da sua instituição. Confira os prazos oficiais antes de começar.",steps:["Consulte o calendário acadêmico e confirme o período de matrícula.","Acesse o SIGAA pelo endereço oficial da sua instituição.","Entre no Portal do Discente e procure a área de ensino ou matrícula.","Consulte as turmas e disciplinas disponíveis para seu período.","Selecione as disciplinas desejadas, respeitando pré-requisitos e conflitos de horário.","Revise sua solicitação e confirme somente após conferir todas as informações.","Consulte posteriormente o resultado ou comprovante da solicitação."]},
  {id:"email",title:"Validar e-mail ou recuperar acesso",category:"acesso",categoryName:"Acesso e conta",icon:"✉",description:"Orientações gerais para confirmar seu e-mail ou recuperar o acesso.",intro:"A recuperação de acesso deve ser feita somente pelos canais oficiais da sua instituição. Nunca informe sua senha a terceiros.",steps:["Acesse a página oficial de login do SIGAA da sua instituição.","Procure a opção de validação de e-mail ou recuperação de senha, se disponível.","Informe apenas os dados solicitados pelo próprio portal oficial.","Verifique sua caixa de entrada e também a pasta de spam ou lixo eletrônico.","Siga o link ou código enviado pela instituição, observando o prazo de validade.","Se não receber a mensagem ou o erro continuar, entre em contato com o suporte institucional."]},
  {id:"historico",title:"Consultar histórico acadêmico",category:"documentos",categoryName:"Documentos",icon:"▤",description:"Saiba onde procurar suas informações e registros acadêmicos.",intro:"O histórico acadêmico reúne informações sobre sua trajetória no curso. A visualização pode variar conforme o perfil e a instituição.",steps:["Acesse o SIGAA pelo endereço oficial da sua universidade.","Entre no Portal do Discente com sua conta institucional.","Procure a área de Ensino ou Consultas Acadêmicas.","Localize a opção de histórico ou rendimento acadêmico.","Confira as informações exibidas e identifique se o documento é parcial ou oficial.","Caso precise de uma versão oficial, consulte a secretaria acadêmica sobre emissão e autenticação."]},
  {id:"horarios",title:"Consultar horários e turmas",category:"matricula",categoryName:"Matrícula",icon:"◷",description:"Encontre informações sobre turmas, horários e componentes curriculares.",intro:"A oferta de turmas depende do período letivo e da organização de cada curso.",steps:["Acesse o portal oficial do SIGAA da sua instituição.","Procure a área de Ensino ou Consulta de Turmas.","Selecione o período letivo desejado, quando solicitado.","Use os filtros disponíveis para localizar seu curso ou disciplina.","Confira horários, docentes, vagas e possíveis observações.","Em caso de divergência, confirme a informação com a coordenação do curso."]},
  {id:"dados",title:"Atualizar dados cadastrais",category:"acesso",categoryName:"Acesso e conta",icon:"◎",description:"Veja cuidados importantes antes de alterar seus dados no sistema.",intro:"Alguns dados podem ser atualizados pelo próprio estudante; outros exigem solicitação à instituição.",steps:["Acesse o SIGAA pelo endereço oficial da instituição.","Entre no Portal do Discente.","Procure a área de perfil ou dados cadastrais.","Verifique quais campos estão disponíveis para edição.","Atualize somente as informações necessárias e revise antes de salvar.","Se o campo estiver bloqueado ou exigir comprovação, procure a secretaria ou suporte institucional."]}
];

const grid=document.getElementById("guideGrid"), search=document.getElementById("searchInput"), empty=document.getElementById("emptyState");
let activeFilter="todos", currentGuide=null;
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function renderGuides(){
  const term=search.value.trim().toLocaleLowerCase("pt-BR");
  const filtered=guides.filter(g=>(activeFilter==="todos"||g.category===activeFilter)&&`${g.title} ${g.description} ${g.categoryName}`.toLocaleLowerCase("pt-BR").includes(term));
  grid.innerHTML=filtered.map(g=>`<button class="guide-card" data-id="${g.id}"><span class="card-icon">${g.icon}</span><h3>${escapeHTML(g.title)}</h3><p>${escapeHTML(g.description)}</p><span class="card-bottom"><span>${g.categoryName} · Ver tutorial</span><span>→</span></span></button>`).join("");
  document.getElementById("guideCount").textContent=`${String(filtered.length).padStart(2,"0")} ${filtered.length===1?"GUIA DISPONÍVEL":"GUIAS DISPONÍVEIS"}`;
  empty.hidden=filtered.length!==0;
}
function updateProgress(){
  const checks=[...document.querySelectorAll("#stepsList input")],done=checks.filter(c=>c.checked).length,total=checks.length,pct=total?Math.round(done/total*100):0;
  document.getElementById("progressText").textContent=`${done} de ${total} etapas concluídas`;
  document.getElementById("progressPercent").textContent=`${pct}%`;
  document.getElementById("modalProgress").style.width=`${pct}%`;
}
function openGuide(id){
  currentGuide=guides.find(g=>g.id===id);if(!currentGuide)return;
  document.getElementById("modalCategory").textContent=`GUIA · ${currentGuide.categoryName.toUpperCase()}`;
  document.getElementById("modalTitle").textContent=currentGuide.title;
  document.getElementById("modalIntro").textContent=currentGuide.intro;
  document.getElementById("stepsList").innerHTML=currentGuide.steps.map((s,i)=>`<label class="step-item"><input type="checkbox" aria-label="Marcar etapa ${i+1} como concluída"><span><strong>Etapa ${i+1}.</strong> ${escapeHTML(s)}</span></label>`).join("");
  document.getElementById("feedbackMessage").textContent="";
  document.getElementById("guideModal").hidden=false;document.body.style.overflow="hidden";updateProgress();
}
function closeGuide(){document.getElementById("guideModal").hidden=true;document.body.style.overflow="";}
grid.addEventListener("click",e=>{const card=e.target.closest("[data-id]");if(card)openGuide(card.dataset.id)});
grid.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){const card=e.target.closest("[data-id]");if(card){e.preventDefault();openGuide(card.dataset.id)}}});
search.addEventListener("input",renderGuides);
document.querySelector(".filters").addEventListener("click",e=>{const btn=e.target.closest("[data-filter]");if(!btn)return;activeFilter=btn.dataset.filter;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));renderGuides()});
document.getElementById("stepsList").addEventListener("change",updateProgress);
document.getElementById("modalClose").addEventListener("click",closeGuide);
document.getElementById("guideModal").addEventListener("click",e=>{if(e.target.id==="guideModal")closeGuide()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!document.getElementById("guideModal").hidden)closeGuide()});
document.querySelector(".feedback").addEventListener("click",e=>{const btn=e.target.closest("[data-feedback]");if(!btn||!currentGuide)return;const key=`sigaa-facil-feedback-${currentGuide.id}`;try{localStorage.setItem(key,btn.dataset.feedback)}catch(_){}document.getElementById("feedbackMessage").textContent="Obrigado pela avaliação! Sua resposta fica salva somente neste navegador."});
const menuToggle=document.getElementById("menuToggle"),nav=document.querySelector(".main-nav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.textContent=open?"×":"☰"});
nav.addEventListener("click",e=>{if(e.target.closest("a")){nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.textContent="☰"}});
renderGuides();
