$(document).ready(function(){//==must encompass all codes

//==BEGIN fetch all function
$('#fetch-all').click(function(){//== iD '#' of button in hbs
  
//==ONCE route is created, THEN create axios call to api
axios.get('/api/characters')
  .then((responseFromApi) => {//responseFromApi can be caleed w/e
    
    //==empty container before returning response
    $('.characters-container').empty();
    
    //==for each loop through array of characters in database
    responseFromApi.data.forEach((eachCharacter) => {//==can be whatever name

      //==name of container in hbs
$('.characters-container').append(`
      <div class="character-info">
      <div class="name">name: ${eachCharacter.name}</div>
      <div class="occupation">occupation: ${eachCharacter.occupation}</div>
      <div class="weapon">weapon: ${eachCharacter.weapon}</div>
      <div class="cartoon">cartoon: ${eachCharacter.cartoon}</div>
      <div class="theId">ID: ${eachCharacter._id}</div>
      </div>`)//==append each new field to the page in a new container
    
    });
    
  });
  
});//==END fetch-all click function

//===========================================================


//==BEGIN fetch-one function
$('#fetch-one').click(function(){
  //==making theId same value that was input into character-id field
  const theId = $('.character-id').val();

    if(!theId){//==to stop from fetching all caracters
      console.log('must enter id to work')
      return;
    }
    
//==ONCE route is created, THEN create axios call to api
    axios.get(`./api/characters/${theId}`)//==axios getting the id from database
      .then((response) => {
       // console.log(response.data)

                            //==same as empty()and then appending
       $('.characters-container').html(`
      <div class="character-info">
      <div class="name">name: ${response.data.name}</div>
      <div class="occupation">occupation: ${response.data.occupation}</div>
      <div class="weapon">weapon: ${response.data.weapon}</div>
      <div class="cartoon">cartoon: ${response.data.cartoon}</div>
      <div class="theId">ID: ${response.data._id}</div>
      </div>`)
      })
      .catch((err) => {
        console.log(err)
      })
});//==END fetch-one click function

//===================================================

//==BEGIN new character submit function
$('#new-character-form').submit(function(event){
  event.preventDefault();//==prevents form from submitting
  
  const charInfo = {};
    charInfo.theName = $('.new-name').val();
    charInfo.theOccupation = $('.new-occupation').val();
    charInfo.theWeapon = $('.new-weapon').val();


    //==for checkbox for cartoon
    if($('.new-cartoon').is(':checked')){
      charInfo.theCartoon = true
    }else{
      charInfo.theCartoon = false
    }
    //==ONCE route is created, THEN create axios call
    axios.post('/api/characters/create', charInfo)//==will become req.body in character api
    .then((response) => {
      //console.log("res is: ", response)
      $('#fetch-all').click();//==clicks fetch all after creating new character
    })
    .catch((err) => {
      console.log(err)
      //==next only exists in character api so we console.log instead
    })

    //==to clear out input boxes after creating new character
    $('.new-name').val("");
    $('.new-occupation').val("");
    $('.new-weapon').val("");
    $('.new-cartoon').prop('checked', false);//==uncheck



});//==END new character function

//==================================================


//BEGIN edit character function
$('#edit-character-form').submit(function(e){
  e.preventDefault();

  const id = $('.edit-chr-id').val()

  const editCharInfo = {}
    editCharInfo.name = $('.edit-name').val();
    editCharInfo.occupation = $('.edit-occupation').val();
    editCharInfo.weapon = $('.edit-weapon').val();

    if($('edit-cartoon').is(':checked')){
      editCharInfo.cartoon = true;
    }else{
      editCharInfo.cartoon = false;
    }

    //==ONCE route is created, THEN create axios call
                            //==same as const id (above)
    axios.post(`/api/characters/update/${id}`, editCharInfo)//==route and req.body
    .then((response) => {
      $('.character-id').val(id)//==getting the updated character by typing id value into search by id box
      $('#fetch-one').click();
      $('input').val("")//==clears out inputs, same as below
    })
    .catch((err) => {
      console.log(err)
    })

    // $('.edit-chr-id').val("");
    // $('.edit-name').val("");
    // $('.edit-occupation').val("");
    // $('.edit-weapon').val("");
    // $('.character-id').val("")//==clearing fetch by id box

    $('input').val("")//==clears out inputs, same as above
    $('.edit-cartoon').prop('checked', false);//==uncheck


});//END edit character function























})//==END document ready
