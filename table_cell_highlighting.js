require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView) {

    var CustomRangeRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            return _(['home', 'visitor']).contains(cell.field);
        },
        render: function($td, cell) {
             var label = cell.value.split("|")[0];
             var val = cell.value.split("|")[1];
 
             if (val == "win") {
                 $td.html("<div class='css_for_win'>+label+"</div>")
             }
             else {
                 $td.html("<div class='align_center'>"+label+"</div>")
             }

        }
    });
         //List of table IDs to add icon
     var tableIDs = ["gamesereport"];
     for (i=0;i<tableIDs.length;i++) {
         var sh = mvc.Components.get(tableIDs[i]);
         if(typeof(sh)!="undefined") {
             sh.getVisualization(function(tableView) {
                 // Add custom cell renderer and force re-render
                 tableView.table.addCellRenderer(new CustomRangeRenderer());
                 tableView.table.render();
             });
         }
     }    
 });
