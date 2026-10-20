'use strict';
const PREFIX='gabinete-aviso-';
const ICON_128=chrome.runtime.getURL('assets/img/icon/128.png');
const ICON_48=chrome.runtime.getURL('assets/img/icon/48.png');
async function showNotification(id,item){
  const base={type:'basic',title:`Aviso do Gabinete: ${item.title||'Lembrete'}`,message:item.description||`Data: ${item.date}`};
  try{await chrome.notifications.create(id,{...base,iconUrl:ICON_128});return true;}
  catch(firstError){try{await chrome.notifications.create(id,{...base,iconUrl:ICON_48});return true;}catch(error){console.warn('O navegador não conseguiu exibir a notificação do Gabinete.',error||firstError);return false;}}
}
async function schedule(){
  const old=await chrome.alarms.getAll();
  for(const alarm of old)if(alarm.name.startsWith(PREFIX))await chrome.alarms.clear(alarm.name);
  const {notices=[]}=await chrome.storage.local.get('notices');
  let changed=false;
  for(const item of notices){
    if(!item.notify||!item.date||item.alertedAt)continue;
    const when=new Date(`${item.date}T${item.time||'09:00'}:00`).getTime();
    if(when>Date.now())chrome.alarms.create(PREFIX+item.id,{when});
    else if(await showNotification(PREFIX+item.id,item)){item.alertedAt=new Date().toISOString();changed=true;}
  }
  if(changed)await chrome.storage.local.set({notices});
}
chrome.runtime.onInstalled.addListener(()=>schedule().catch(error=>console.warn('Falha ao agendar avisos.',error)));
chrome.runtime.onStartup.addListener(()=>schedule().catch(error=>console.warn('Falha ao agendar avisos.',error)));
chrome.alarms.onAlarm.addListener(async alarm=>{
  if(!alarm.name.startsWith(PREFIX))return;
  const id=alarm.name.slice(PREFIX.length);
  const {notices=[]}=await chrome.storage.local.get('notices');
  const item=notices.find(n=>n.id===id);
  if(!item||!item.notify)return;
  if(await showNotification(alarm.name,item)){item.alertedAt=new Date().toISOString();await chrome.storage.local.set({notices});}
  else chrome.alarms.create(alarm.name,{when:Date.now()+5*60*1000});
});
chrome.notifications.onClicked.addListener(()=>chrome.action.openPopup().catch(()=>{}));
chrome.storage.onChanged.addListener((changes,area)=>{if(area==='local'&&changes.notices)schedule().catch(error=>console.warn('Falha ao agendar avisos.',error))});
