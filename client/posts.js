Template.posts.onCreated(function(){
    this.interval = Meteor.setInterval(function(){
        Session.set('live', Random.id());
    }, 1000);
    var pageId = this.data.pageId;
    pageId && this.subscribe('getPage', pageId);
});
Template.posts.helpers({
    'posts':function(){
        return Posts.find({
            pageId:Template.instance().data.pageId
        },{
            sort:{
                createdAt:-1
            }
        });
        /*
        return [
            {
                author:{
                    name:'Master',
                    profile_image:'http://lorempixel.com/64/64/cats/'
                },
                message:'집사야 내 밥은 어딨냐?'
            },
            {
                author:{
                    name:'Slave4U',
                    profile_image:'http://lorempixel.com/64/64/people/'
                },
                message:'배고파서 내가 먹었다 ㅋㅋㅋ'
            }
        ]*/
    },
    'timeFrom':function(time){
        Session.get('live');
        return moment().from(time);
    }
});