// auto-offline.js - FINAL UNIVERSAL (Firebase + Non-Firebase)
(function(){
  function init(){
    let isFirebase = typeof firebase !== 'undefined' && firebase.database;
    if(isFirebase){
      try { firebase.database().goOnline(); } catch(e){}
      document.addEventListener('visibilitychange',()=>{
        try{
          if(document.hidden) firebase.database().goOffline();
          else firebase.database().goOnline();
        }catch(e){}
      });
      window.addEventListener('beforeunload',()=>{
        try{ firebase.database().goOffline(); }catch(e){}
      });
    }

    // AUTO LOGOUT 15 MENIT
    let t;
    function resetT(){
      clearTimeout(t);
      t = setTimeout(()=>{
        try{ if(isFirebase) firebase.database().goOffline(); }catch(e){}
        alert('Sesi habis (15 menit tidak aktif), login lagi ya');
        localStorage.removeItem('login');
        location.href = '../../login/';
      }, 15*60*1000);
    }
    ['click','touchstart','keydown','mousemove','scroll'].forEach(e=>document.addEventListener(e, resetT));
    resetT();
  }

  // tunggu firebase kalau ada
  let tries = 0;
  let iv = setInterval(()=>{
    if(typeof firebase !== 'undefined' || tries > 20){
      clearInterval(iv);
      init();
    }
    tries++;
  }, 300);
})();