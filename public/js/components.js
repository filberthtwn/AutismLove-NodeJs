import moment from '/moment/moment.js'

const components = $(document).ready(function () {
    if($('.update-injection-route-btn').length){
        var injectionRouteDp;
        $('#popup-d-content').removeClass('overflow-y-auto');

        $('.update-injection-route-btn').on("click", function(){
            $('#popup_d').addClass('flex')
            $('#popup_d').removeClass('hidden')

            const selectedIdx = $(this).data('idx');
            const selectedInjectionRoute = injectionRoutes[selectedIdx];

            if ($('#injection-route-date-input').length){
                if (injectionRouteDp){
                    injectionRouteDp.remove()
                }

                injectionRouteDp = datepicker('#injection-route-date-input', {
                    formatter: (input, date, instance) => {
                        const value = moment(date).format('YYYY-MM-DD');
                        input.value = value
                    },
                    dateSelected: (selectedInjectionRoute.date) ? new Date(selectedInjectionRoute.date) : new Date(),
                })
            }
            $('#injection-route-form').attr('action', "route/" + selectedInjectionRoute.id + "?_method=PATCH");
        })
    }

    if($('#create-push-btn').length){
        $('#create-push-btn').on("click", function(){
            /// Update popup title
            $('#push-notif-popup-title').text(PUSH_NOTIFICATION_DETAIL);

            /// Hide created date hidden input
            $('#push-notif-created-date').addClass('hidden');

            /// Hide delete button
            $('#delete_popup_btn').addClass('hidden');

            /// Make save button full width
            $('#save_popup_btn').removeClass('col-span-1');
            $('#save_popup_btn').addClass('col-span-2');

            /// Show push notif upload image section
            toggleImageSection(false);

            /// Hide selected user count container
            $('#selected-user-count-d').addClass('hidden');

            /// Enable all input
            $('#push-notif-form-group').find('input, textarea').attr('disabled', false);

            /// Show delete image button
            $('#push-notif-image-delete-btn').removeClass('hidden');

            /// Change form action
            $('#push-notif-form').attr('action',  url);

            $('#popup_d').addClass('flex')
            $('#popup_d').removeClass('hidden')
        })
    }

    if($('#close_popup_btn').length){
        $('#close_popup_btn').on("click" ,function(){
            $('#popup_d').addClass('hidden');

            $('#anticancer-record-form-group').find('input').val('')
            resetPushNotifInput();
            
            selectedUsers = [];
        })
    }

    if($('.push-notif-edit-btn').length){
        $('.push-notif-edit-btn').on("click" ,function(){
             /// Update popup title
             $('#push-notif-popup-title').text(UPDATE_PUSH_NOTIFICATION);

            /// Show created at hidden input
            $('#push-notif-created-date').removeClass('hidden');

            /// Show delete button
            $('#delete_popup_btn').removeClass('hidden');

            /// Make save button halkf width
            $('#save_popup_btn').addClass('col-span-1');
            $('#save_popup_btn').removeClass('col-span-2');

            const index = $(this).data('idx');
            const notification = notifications[index];

            $('#push-notif-form').attr('action',  url + '/' + notification.id + '?_method=PATCH')
            $('#push-notif-delete-form').attr('action',  url + '/' + notification.id + '?_method=DELETE')

            $('#push-notif-popup-title').text('Update Push Notification');
            
            $('#push-notif-title-input').val(notification.title);
            $('#push-notif-date-input').val(moment(notification.created_at).format('YYYY-MM-DD HH:mm'));
            $('#push-notif-link-input').val(notification.link);

            if (notification.image_url){
                /// Change image preview name
                $('#push-notif-image-name').text(notification.image_url.split('/')[notification.image_url.split('/').length - 1]);
                toggleImageSection(true);
            }

            $('#push-notif-description-input').val(notification.description);

            /// Show selected user count container
            $('#selected-user-count-d').removeClass('hidden');
            
            /// Update selecter user count
            $('#selected-user-count').text('0 user selected');

            /// Hide save button
            $('#save_popup_btn').addClass('hidden');

            /// Show send push button
            $('#send_push_btn').removeClass('hidden');
            
            /// Disabled all input
            $('#push-notif-form-group').find('input, textarea').attr('disabled', true);

            /// Hide delete image button
            $('#push-notif-image-delete-btn').addClass('hidden');

            $('#popup_d').addClass('flex')
            $('#popup_d').removeClass('hidden')
        })
    }

    /**
     * Expand Text Input When Current Popup Type is 'TEXT'
     */
    if (typeof popup !== 'undefined'){
        if (popup.popup_type == 'TEXT'){
            $('#popup-type-image-input-d').addClass('hidden');
            $('#popup-type-text-input-d').removeClass('hidden');
        }
    }
    
    /**
     * Popup Type Button Handler
     */
    if($('#popup-type-input').length){
        $('#popup-type-input').on('change', function(){
            const popupType = $(this).val();

            $('#popup-type-image-input-d').addClass('hidden');
            $('#popup-type-text-input-d').addClass('hidden');

            if (popupType == 'IMAGE'){
                $('#popup-text-input').val('');
                $('#popup-type-image-input-d').removeClass('hidden');
                return
            }
            
            toggleImageSection(false);
            $('#popup-image-input').val('');
            $('#popup-type-text-input-d').removeClass('hidden');
        });
    }

    /**
     * Button Type Button Handler
     */
     if($('#popup-button-type-input').length){
        $('#popup-button-type-input').on('change', function(){
            const popupButtonType = $(this).val();

            $('#popup-link-input-d').addClass('hidden');

            if (popupButtonType == 'LINK'){
                $('#popup-link-input-d').removeClass('hidden');
                return
            }
        });
    }
});

export default {
    components
}