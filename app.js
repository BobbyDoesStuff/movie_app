(function () {

    $('#submitButton').on('click', getShowName); 
    // SEARCH SUGGESTION FUNCTIONALITY
    // $('#showInput').on('input', displaySuggestions);

    // function displaySuggestions(){
    //     if($('#showInput')[0].value.length > 2){
    //         let searchValue = $('#showInput')[0].value;
    //         $.tvmaze.getShow( searchValue, (results) => {            
    //           console.log(results); 
    //        );
    //     }
    // }

    // let displayResults = true;

    // function displaySuggestions() {
    //     let searchValue = $('#showInput')[0].value;
    //     if (displayResults) {
    //         if (searchValue.length > 2) {
    //             //displayResults= false;
    //             $.tvmaze.getShow( searchValue, (results) => {
    //             console.log(results); 
    //         });
    //     }
    //     } else if (searchValue.length < 2) {
    //         displayResults = true;
    //         //$.tvmaze.getShow( searchValue, (results) => {
    //             //console.log(results); 
    //         //});
    //     }
    // }


    function getShowName(event) {
        event.preventDefault();

        if ($('#showInput')[0].value.length <= 0) return;
        let searchValue = $('#showInput')[0].value;
        $.tvmaze.getShow(searchValue, (results) => {
            displayShowResults(results[0].show);
            $.tvmaze.getShow(searchValue, (results) => {
                console.log(results);
            });
        });
    }

    function displayShowResults(results) {
        $('#tableBody').html(`<td id="episodeName"  data-episodeid= "${results.id}">${results.name}<button id="show-data" style="display:block; margin-top: 20px;">Show movie info</button><button id="hide-data" style="display:block; margin-top: 20px;">Hide movie info</button></td><td>${checkNetwork(results.network)}</td><td>${results.type}</td><td> <img  class="image-border" src= " ${results.image.medium}"> </td>`);
        $('#episodeInfo tr').remove();

        $('#show-data').on('click', (event) => {
            getEpisodes($(event.target).parent().attr('data-episodeid'));
        });

        $('#hide-data').on('click', (event) => {
            $('#episodeInfo tr').remove();
        });
    }

    function checkNetwork(networkName) {
        return networkName != null ? networkName.name : 'Not Listed';
    }

    function getEpisodes(episodeID) {
        $.tvmaze.getEpisodes(episodeID, function (results) {
            results.forEach(result => {
                $('#episodeInfo').append(
                    `<tr> 
                         <td>${result.airdate}</td> 
                         <td>${result.name}</td> 
                         <td>${result.number}</td> 
                         <td>${result.season}</td> 
                         <td>${result.runtime}</td> 
                         <td>${result.summary}</td>
                     </tr>`)

            });
        });

    }



})();