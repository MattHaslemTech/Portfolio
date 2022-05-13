/*
 *  Build list of skills
 */

var skillItemWrap = $('.skills-item-wrap');
var wordCloudWrap = $('.word-cloud-wrap');

// Build array of items according to their priority
// Key    => priority of item - 1
// Value  => array of items with that priority
var skillsItems = new Array();


// Build associative array of items according to their type
// Key    => priority type
// Value  => array of items with that priority type
var skillsItemsByType = {};



// Push first priority array
skillsItems.push(new Array());

// Go through each skill and add them to the lists.
skillItemWrap.find('.item').each(function(){

  /// Set priority list
  var priorityInt = parseInt($(this).data('priority'));

  // If the priority already exists, add the item to the array
  if(skillsItems[priorityInt - 1] !== undefined)
  {
    skillsItems[priorityInt - 1].push($(this));
  }
  else
  {
    skillsItems[priorityInt - 1] = new Array();
    skillsItems[priorityInt - 1].push($(this));
  }


  /// Set skill type list

  // Get types from this item
  var types = $(this).data('type');
  types = types.split(" ");

  // Go through each type and add it to skillsItemsByType array
  for(var i = 0; i < types.length; i++)
  {
    var type = types[i];

    // If the type already exists, add the item to the array
    if(skillsItemsByType[type] !== undefined)
    {
      skillsItemsByType[type].push($(this));
    }
    else
    {
      skillsItemsByType[type] = new Array();
      skillsItemsByType[type].push($(this));
    }
  }


});



/*
 * Place skill items in word cloud
 */
generateWordCloud(skillsItems)
function generateWordCloud(items)
{
  var append = true;
  // Go through each priority array in skillsItems
  $.each(items, function(index, value){
    // Go through each item in array

    $.each(value, function(index, value){

      // We want alternate betwen appending and prepening to the word cloud to keep higher priority values in the middle
      if(append)
      {
        wordCloudWrap.append(value);
        append = false;
      }
      else
      {
        wordCloudWrap.prepend(value);
        append = true;
      }

    });

  });

}


/*
 *  Handle filtering check box actions
 */
var checkedTypes = new Array();
var checkedProfessional = "all";

let filtersWrap = $('.filters-wrap');

filtersWrap.find('input').off('click').on('click', function(e){

  e.stopPropagation();

  var type = $(this).val();

  // If we just checked the box, add the value to array of checked types
  if($(this).is(':checked'))
  {

    // If this is one of the radio buttons, we want to uncheck the other radio
    if($(this).hasClass('radio'))
    {
      // Just uncheck all checked ones
      filtersWrap.find('input.radio:checked').trigger('click');
      checkedProfessional = type;
    }

    // Add to list of checked type if it's not a proessional radio
    else
    {
      checkedTypes.push(type);
    }


  }
  else
  {
    // If this is one of the radio buttons, we want to uncheck the other radio
    if($(this).hasClass('radio'))
    {
      // Just uncheck all checked ones
      filtersWrap.find('input.radio:checked').trigger('click');
      checkedProfessional = "all";
    }

    // Remove type from list of checked types
    checkedTypes= $.grep(checkedTypes, function(value) {
      return value != type;
    });
  }

  updateActiveSkills();

});



/*
 * Update the active items in the word cloud based on what types are in checkedTypes
 */

function updateActiveSkills() {
  // Remove all active items
  wordCloudWrap.find('.item.active').removeClass('active');

  // If there are no checked types and professional type isn't set, remove "filter" from the wordCloudWrap
  if(checkedTypes.length == 0)
  {
    // If professional Type isn't set
    if(checkedProfessional == "all")
    {
      wordCloudWrap.attr('filter', 'false');
      return;
    }
    // If professional type is set, but no professional types are
    else
    {
        wordCloudWrap.attr('filter', 'true');

        // Go through each skill item
        $.each(skillsItemsByType, function(key, value){
          $.each(value, function(key, value){

            // Check if this item has that professional Type
            if(~$(this).data('professional').indexOf(checkedProfessional))
            {
              $(this).addClass('active');
            }

          });
        });

    }

  }
  else
  {
    wordCloudWrap.attr('filter', 'true');
  }

  // Go through each item in checkedTypes
  for(var i = 0; i < checkedTypes.length; i++)
  {
    // Go through each item with that type and add 'active' class
    $.each(skillsItemsByType[checkedTypes[i]], function(){

      // If professional type is set
      if(checkedProfessional != "all")
      {
        // Check if this item has that professional Type
        if(~$(this).data('professional').indexOf(checkedProfessional))
        {
          $(this).addClass('active');
        }
      }
      else
      {
        $(this).addClass('active');
      }

    });
  }

}


/*
 * Clear skills filters button
 */
$('.button.clear-skill-filters').on('click', function(){
  filtersWrap.find('input:checked').trigger('click');
});
