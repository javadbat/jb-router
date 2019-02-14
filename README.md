# jb-router

pure js router to route react component (not ready for public use yet)

## installation

npm install jb-route(not ready yet)

## initiate router

1. import  package to your HOC(higher order component) or layout page;
    import Router from 'jb-router'
2. create new object of router:

    var router = new Router(RouterConfigData);
router config data is router config file that i will explain later

### determine page place DOM in HTML file or JSX View page

- create div tag by id pageContainerTagId of router config in your layout for add component to it as child

            <div id="PagePlace"></div>

### create config file

1.create a RouterData.js file
            class RouterData {

                basePath= '/basePath'; // base path of rout page
                pageContainerTagId = 'pageContainerTagId'; //id of html tag while component add as child in this tag
                pagesTitlePrefix = "AppName title"; //add this title to title of component
                routes = [
                            {
                                url:                "/", //path of page
                                reactComponentPath: "ComponentFolder/ComponentFile", // component of page
                                name:               "ComponentName", // name of page 
                                title:              "Page title"//title of page
                            }
                ] // array of path to open component
            }
2.import RouterData.js in your layout page and pass it as parameter to Router constructor

3.to add childRoute to this routeItem you can set childRoutes property of item as below:

        {
            url:                "/", //path of page
            reactComponentPath: "ComponentFolder/ComponentFile", // component of page
            name:               "ComponentName", name of page
            title:              "Page title"//title of page
            childRoutes: [
                {
                    url:                "/user",// this url add to parent url and create path  
                    reactComponentPath: "ComponentFolder/UsersComponentFile",//componnet of page 
                    name:               "generalUser",// name of page
                    title:"اطلاعات کاربر", titel of page,
                    childRoutes: [
                        {
                            url:                "/add",// this url add to parent url and create path  
                            reactComponentPath: "ComponentFolder/AddComponentFile",//componnet of page 
                            name:               "AddUserPage",// name of page
                            title:"اضافه کردن کاربر",// titel of page
                        }
                    ]
                }
                ]
            }

as you can see every route item can have child route that inherit url from parent route for example https://domain.com/user/add will load "AddUserPage"
the child route also inherit settings of prent route.
if you dont define reactComponentPath url cant be loaded and will throw exception on page load but they can have child routes
to pass URL params variable to component set variable and use it as props like below:

            {
                url:                "/user/{userId}/detail", // detail of user page
                reactComponentPath: "ComponentFolder/user.js", //component of page
                name:               "userDetail", name of page
                title:              "ویرایش کاربر"//title of page
            }

to give params variable in user component in user.js file use code of below:

            class User extends Component{
                constructor(props){
                    super(props);
                    this.userId = this.router.params.userId
                }
            }

### how to load page

- to load  page , you must use loadPage method of router as below:

            this.router.loadPage(url); //e.g this.router.loadPage("/user/add")

### get informed on load page finished

- there is a callback method on load state change in router mean when you call `this.router.loadPage(url)` the callback function called and `newState` will be 0 after router could find route item in your data config file , new state will be 1 and after finish everything the newState will be 5 so you can stop showing loading

            this.router.config.events.onLoadStateChange = function(oldState,newState){}

## requirement

jb-router currently use SystemJS as a dynamic module loader so youu need to init and config systemjs first in your app
