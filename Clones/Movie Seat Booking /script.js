const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateUI();

function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);

}

function updatedSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount =selectedSeats.length;

    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));


    count.innerText =selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats!=null && selectedSeats.length > 0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !=null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

movieSelect.addEventListener('change',function(e){
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex,e.targetvalue)
    updatedSelectedCount();
});


container.addEventListener('click',function (e){
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ){
        e.target.classList.toggle('selected');
        updatedSelectedCount();
    }
});

//Initial Count
updatedSelectedCount();


