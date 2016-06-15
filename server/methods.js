Meteor.methods({
    'addPosts':function(obj){
        check(this.userId, String);
        Posts.insert({
            author:{
                _id:this.userId,
                name:Meteor.user().username,
                profile_image:Gravatar.imageUrl(Meteor.user().emails[0].address, {d:'retro',s:64})
            },
            message:obj.message,
            pageId:Meteor.user().username,
            createdAt:new Date()
        });
    },
    'follow':function(pageId){
        check(this.userId, String);
        var obj = {};
        obj['profile.followings.'+pageId] = {createdAt:new Date()};
        console.log('obj',obj);
        Meteor.users.update(this.userId, {$set:obj});
    },
    'unfollow':function(pageId){
        check(this.userId, String);
        var obj = {};
        obj['profile.followings.'+pageId] = '';
        Meteor.users.update(this.userId, {$unset:obj});
    }
});