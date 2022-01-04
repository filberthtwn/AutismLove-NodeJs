var delayTimer;
var sortQuery = [];
var selectedPage = 1;
var searchQuery = '';

function initializePagination(url, totalCount, limit, callback){
    if (!url){
        alert('Ajax URL Missing!');
    }

    if (totalCount == null){
        alert('Total count Missing!');
    }

    if (!limit){
        alert('Limit Missing!');
    }

    if (!callback){
        alert('Callback Missing!');
    }

    if (!$('.page-btn')){
        alert('Page Button Missing!');
    }

    $('#prev-page-btn').on('click', function(){
        if (selectedPage < 2){
            return
        }
        selectedPage = selectedPage - 1;
        $('.page-btn').removeClass('active');
        $('.page-btn[data-page=' + selectedPage + ']').addClass('active');

        getUsers(url, callback);
    });

    $('.page-btn').on('click', function(){
        selectedPage = $(this).data('page');
        $('.page-btn').removeClass('active');
        $(this).addClass('active');

        getUsers(url, callback);
    });

    $('#next-page-btn').on('click', function(){
        if (selectedPage == Math.round(totalCount/limit)){
            return
        }

        selectedPage = selectedPage + 1;
        $('.page-btn').removeClass('active');
        $('.page-btn[data-page=' + selectedPage + ']').addClass('active');

        getUsers(url, callback);
    });
}

function initializeSearch(url, searchInput, bodyList, callback) {
    if (!searchInput){
        alert('Search Input Missing!');
    }

    if (!bodyList){
        alert('Body List Missing!');
    }

    searchInput.on('input', function(){
      clearTimeout(delayTimer);

      selectedPage = 1;
      $('.page-btn').removeClass('active');
      $('.page-btn').eq(0).addClass('active');

      $('.page-btn').each((index, val) => {
          if(index > 0){
            val.remove();
          }
      });
      $('.page-separator').remove();

      searchQuery = searchInput.val();
      bodyList.empty();

      delayTimer = setTimeout(function() {
        getUsers(url, callback);
      }, 1000);
    })
};

function initializeSorting(url, callback){
    $('.sort-btn').on('click', function(){
        console.log($(this).data('name'));
        console.log($(this).data('sort'));
        
        const name = $(this).data('name');

        $(this).data('sort', ($(this).data('sort') == 'ASC') ? 'DESC' : 'ASC');

        const sort = $(this).data('sort');
        sortQuery = [name, sort];
        
        $('.sort-img').removeClass("active");
        $(this).find('.sort-img').addClass("active")

        if (sort == 'DESC'){
          $(this).find('.sort-up-img').addClass('hidden');
          $(this).find('.sort-down-img').removeClass('hidden');
        }else{
          $(this).find('.sort-up-img').removeClass('hidden');
          $(this).find('.sort-down-img').addClass('hidden');
        }

        getUsers(url, callback)
    });
}

function getUsers(url, callback){
    $.ajax({
        type: 'GET',
        url: url + '/refresh',
        data: {
          search_query: searchQuery,
          page: selectedPage,
          sort: sortQuery
        },
        dataType: 'json',
        success: function(response){
            console.log(response);
            callback(response);
        },
        error: function(request, status, error){
            alert(request.responseText);
        }
    });
}