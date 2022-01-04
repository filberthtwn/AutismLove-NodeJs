const functions = $(document).ready(function () {
    if ($('.edit-anticancerMed-btn').length){
        $('.edit-anticancerMed-btn').on("click", function(){
            const index = $(this).data('idx');
            const anticancerMed = anticancerMeds[index];

            $('#anticancerMed-name-input').val(anticancerMed.name);
            $('#anticancerMed-element-total-input').val(anticancerMed.anticancer_med_design.anticancer_med_design_elements.length);
            $('#anticancerMed-survey-input').val(anticancerMed.survey_id);
            $('#anticancerMed-desc-input').val(anticancerMed.description);

            $('#anticancerMed-record-bg-color-input').val(anticancerMed.record_bg_color);
            $('#anticancerMed-record-table-color-input').val(anticancerMed.record_table_color);

            $('#anticancerMed-design-edit-btn').attr('href', url + '/' + anticancerMed.id + '/design');

            $('#update-anticancerMed-form').attr('action', 'anticancer-med-management/' + anticancerMed.id + "?_method=PATCH");
            $('#update-anticancerMed-d').removeClass('hidden');
        });
    }
});

export default {
    functions
}