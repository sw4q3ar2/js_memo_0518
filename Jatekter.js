import Kartya from "./Kartya.js";
import { adatLista } from "./Kepek.js";

class JatekTer {
  #kartyaLISTA = [];
  #kivalasztottKartyaLISTA = [];
  constructor(kartyaLISTA) {
    this.#kartyaLISTA= kartyaLISTA;
    
    const szuloElem = $("#jatekter");
    for (let index = 0; index < adatLista.length; index++) {
        const kartya = new Kartya(adatLista[index], szuloElem);
    }

    $(window).on("kartyaKatt", (event) => {
      this.#kivalasztottKartyaLISTA.push(event.detail);
      console.log(this.#kivalasztottKartyaLISTA);
      this.#ellenorzes();
    })
  }

  #kever(kartyaLista){
    let jelenlegiIndex = kartyaLista.length;
    let ideiglenesErtek;
    let randomIndex;
    
    while (0 !== jelenlegiIndex){

      randomIndex = Math.floor(Math.random() * jelenlegiIndex);
      jelenlegiIndex -= 1;

      ideiglenesErtek = kartyaLista[jelenlegiIndex];
      kartyaLista[jelenlegiIndex] = kartyaLista[randomIndex]
      kartyaLista[randomIndex] = ideiglenesErtek;
    }

    return kartyaLista;
  }

  #ellenorzes(){
    // ha fel van forditva két kartya
    if(this.#kivalasztottKartyaLISTA.length == 2){
      this.#TriggerBlocked();
      console.log(this.#kivalasztottKartyaLISTA[0].getFajlnev());
      console.log(this.#kivalasztottKartyaLISTA[1].getFajlnev());
      console.log(this.#kivalasztottKartyaLISTA[0].getFajlnev() === 
      this.#kivalasztottKartyaLISTA[1].getFajlnev());
      if(this.#kivalasztottKartyaLISTA[0].getFajlnev() === 
      this.#kivalasztottKartyaLISTA[1].getFajlnev()){
        this.#kivalasztottKartyaLISTA[0].eltuntet();
        this.#kivalasztottKartyaLISTA[1].eltuntet();
        // lista kiuritese
        this.#kivalasztottKartyaLISTA.splice(0,2);
        this.#TriggerUnBlocked();
      }else{
        setTimeout(() => {
          // vissza fordulnak a kartyak
          this.#kivalasztottKartyaLISTA[0].kattintas();
          this.#kivalasztottKartyaLISTA[1].kattintas();
          // lista kiuritese
          this.#kivalasztottKartyaLISTA.splice(0,2);
          this.#TriggerUnBlocked();
        }, 1000);
      }
    }
  }

  #TriggerBlocked(){
    window.dispatchEvent(new Event("gameBlocked"));
    console.log("Blokkolt");
  }

  #TriggerUnBlocked(){
    window.dispatchEvent(new Event("gameUnBlocked"));
    console.log("Nem blokkolt");
  }
}
export default JatekTer;
