import './styles.scss';
// import kitten from './static/images/kitten.jpg';
// import images from './static/images/*.*';

import { chats } from './src/data.js';

// console.log(chats);

// import $ from 'jquery';
// import 'bootstrap';
// $('body').append('jquery + bootstrap works!');

// document.body.innerHTML += `<img src="${images.wibe.jpg}" width="100"/>`;

// onst titre1 = '<h2>Les chats preferés</h2>';
/// /const titre2 = '<h2>Les chatdoptables</h2>';

// app.classList.add('card-columns');

// Check if I find the div
// console.log(app);
// Check if data appear inside app
// app.innerHTML = `<img src="${images.wibe.jpg}" width="100"/>`;
// Check how can I access the data
// console.log(chats[0]);

// console.log(data[0]);

// for (let i = 0; i < chats.length; i++) {
//   let divTotal = '';
//   let divInside = '<div class="card" style="width: 18rem;"></div><div class="card-body">';
//   divInside += `<img src="images/${chats[i].image}" class="card-img-top" alt="...">`;
//   divInside += `<h5 class="card-title">${chats[i].nom}</h5>`;
//   divInside += `<p class="card-text">${chats[i].description}</p>`;
//   divInside += '<a href="#" class="btn btn-primary">Go somewhere</a>';
//   divInside += '</div></div>';
//   divTotal += divInside;
//   console.log(divTotal);
//   app.innerHTML += divTotal;
// }

// An esiest way to do it --> for
const app = document.getElementById('app');
app.innerHTML += '<h2>Chadoptables</h2><div id="chadoptables"></div><h2>Mes chats preferés</h2><div id="chavoris"></div>';
const chadoptables = document.getElementById('chadoptables');
const chavoris = document.getElementById('chavoris');
// console.log(app);

function populateList(arr, selector) {
  let cardContainer = '<div class="card-columns">';
  for (let j = 0; j < arr.length; j++) {
    cardContainer
    += `<div class="card" id="${j}">
      <div class="img"><img src="images/${arr[j].image}" class="card-img-top" alt="..."></div>
      <div class="card-body">
        <h5 class="card-title">${arr[j].nom}</h5>
        <p class="card-text">${arr[j].description}</p>`;
    if (arr[j].like === true) {
      cardContainer
            += `<i id="${j}" class="fas fa-star"></i>`;
    } else {
      cardContainer
            += `<i id="${j}" class="far fa-star"></i>`;
    }
    cardContainer
        += `<a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`;
  }
  cardContainer += '</div>';
  selector.innerHTML = cardContainer;
}
populateList(chats, chadoptables);
const mesChatsFavoris = [];
populateList(mesChatsFavoris, chavoris);

// With for of:

// for (const chat of chats) {
//   app.innerHTML
//     += `<div class="card" style="width: 18rem;">
//       <img src="images/${chat.image}" class="card-img-top" alt="...">
//       <div class="card-body">
//         <h5 class="card-title">${chat.nom}</h5>
//         <p class="card-text">${chat.description}</p>
//         <a href="#" class="btn btn-primary">Go somewhere</a>
//       </div>
//     </div>`;
// }

// With for forEach:

// chats.forEach((chat) => {
//   app.innerHTML
//        += `<div class="card" style="width: 18rem;">
//            <img src="images/${chat.image}" class="card-img-top" alt="...">
//            <div class="card-body">
//              <h5 class="card-title">${chat.nom}</h5>
//              <p class="card-text">${chat.description}</p>
//              <a href="#" class="btn btn-primary">Go somewhere</a>
//            </div>
//          </div>`;
// });

// app.innerHTML = titre1 + titre2 + cardContainer;

// Delegation d'evenements
function clickDone(e) {
  if (!e.target.matches('i')) return; // skip this unless it's an input
  const el = e.target;
  const index = el.id;
  console.log(el);
  // far -> empty
  // fas -> full
  // we change the class of empty star to ful star and the other way around
  if (el.classList.contains('fas')) {
    el.classList.remove('fas');
    el.classList.add('far');
    /// when star is far (=empty) then we remove it from mesChatsFavoris
    if (mesChatsFavoris.includes(chats[index])) {
      console.log(index);
      console.log(mesChatsFavoris);
      const elementPos = mesChatsFavoris.indexOf(chats[index]);
      mesChatsFavoris.splice(elementPos, 1);
    }
    if (chats.includes(mesChatsFavoris[index])) {
      const elementPosInChats = chats.indexOf(mesChatsFavoris[index]);
      const elementPos = mesChatsFavoris.indexOf(mesChatsFavoris[index]);
      chats[elementPosInChats].like = !chats[elementPosInChats].like;
      mesChatsFavoris.splice(elementPos, 1);
    }
  } else {
    el.classList.remove('far');
    el.classList.add('fas');
    // when star is fas (=full) then we added to mesChatsFavoris
    if (!mesChatsFavoris.includes(chats[index])) { mesChatsFavoris.push(chats[index]); }
  }
  // we change the like status in chats
  chats[index].like = !chats[index].like;
  populateList(chats, chadoptables);
  populateList(mesChatsFavoris, chavoris);
}

app.addEventListener('click', clickDone);
