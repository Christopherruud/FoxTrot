$(document)
    .ready(
    function () {
        var id = 1;

        $("#add")
            .click(
            function () {
                $("#table2")
                    .append(
                    '<tr valign="top"><td width="100px" align="center">'
                    + (id++)
                    + '</td><td width="100px"> '
                    + $("#level")
                        .val()
                    + '</td><td width="100px" align="center"><a href="javascript:void(0);" class="remCF">Remove</a></td> <td><td width="100px" align="center"><a href="quizedit.html">Create test</a></td></tr>');
            });

        $("#table2").on('click', '.remCF', function () {
            $(this).parent().parent().remove();
        });
    });
function populateModuleData(courses, courseNumber) {
    var course = courses[courseNumber];
    var table2 = $("#table2");
    if (course.modules != 'undefined') {
        for (var y = 0; y < course.modules.length; y++) {
            var tableString = "<tr>";
            var module = course.modules[y];
            tableString += '<td width="100px" align="center">'
            + module.moduleId + "</td>";
            tableString += '<td width="100px" align="center">'
            + module.level + "</td>";
            tableString += '<td width="100px" align="center">'
            + module.moduleName + "</td>";
            tableString += '<td width="100px" align="center">'
            + module.moduleDescriptiveText + "</td>";
            tableString += '<td width="100px" align="center">'
            + module.moduleMotivation + "</td>";
            if (module.tests != 'undefined') {
                tableString += '<td width="100px" align="center">'
                + module.tests.length + "</td>";
            } else {
                tableString += '</td>';
            }
            tableString += '<td><a href="javascript:void(0);"class="remCF">Remove</a></td><td><a href="' + "" + '">Create modules</a></td>';
            tableString += '</tr>';
            table2.append(tableString);
        }
    }


}

function parseURL() {
    courseNumber = getQueryVariable("course");
    return courseNumber;
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}