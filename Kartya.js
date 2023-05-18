class Kartya {
  #fajlnev;
  #allapot;
  #blokkolt;
  #divElem;
  #imgElem;

  constructor(fajlnev, szuloElem) {
    this.#fajlnev = fajlnev;
    szuloElem.append(`
        <div class="Kartya">
            <img src='${this.#fajlnev}' alt='kép'>
        </div>
    `);
    this.#divElem = $(".Kartya:last-child");
    this.imgElem = $(".Kartya:last-child img");
    this.imgElem.on("click", () => {
      this.kattintas();
      this.#kattintasTrigger();
    });
    this.#allapot = false;
    this.#setLap();
  }

  setAllapot() {

  }

  getFajlnev() {
    return this.#fajlnev;
  }

  #setLap() {
    console.log(this.#allapot);
    if(this.#allapot){
      console.log(this.#fajlnev);
      this.imgElem.attr("src", this.#fajlnev);
    }else{
      this.imgElem.attr("src", "kepek/hatter.jpg");
    }
  }

  kattintas(){
    this.#allapot = !this.#allapot;
    this.#setLap();
  }
  
  #kattintasTrigger() {
    const esemeny = new CustomEvent("kartyaKatt", { detail: this });
    window.dispatchEvent(esemeny);
  }

  eltuntet(){
    this.#divElem.css("visibility", "hidden");
  }
}
export default Kartya;
