Template.main.onCreated(function(){
    this.subscribe('getPage', Session.get('pageId'));
});
Template.main.helpers({
    'page':function(){
        return Session.get('pageId');
    },
    'isFollowing':function(){
        var followings = Meteor.user().profile.followings;
        return followings && followings[Session.get('pageId')];
    }
});
Template.main.events({
    'submit':function(event, template){
        Meteor.call('addPosts', {
            //name:'Slave4U',
            //profile_image:'http://lorempixel.com/64/64/people/',
            message:template.find('#post').value
            //,pageId:Session.get('pageId')
        }, function(err){
            if(err){
                console.log(err);
            } else {
                template.find('#post').value = '';
            }
        });
        event.preventDefault();
    },
    'click #follow':function(){
        Meteor.call('follow', Session.get('pageId'));
    },
    'click #unfollow':function(){
        Meteor.call('unfollow', Session.get('pageId'));
    }
});