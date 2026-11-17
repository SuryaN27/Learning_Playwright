import{test,expect} from "@playwright/test"

test.beforeAll("BeforeAll",async()=>{
console.log("Before all the test")
})

test.afterAll("AfterAll",async()=>{
console.log("After all the test")
})


test.beforeEach("BeforEach",async()=>{
console.log("Before every test")
})

test.afterEach("AfterEach",async()=>{
 console.log("After every test")

})

test("test1",async({page})=>{
console.log("This is test 1")
})

test("test2",async({page})=>{
console.log("This is test 2")
})


// test("test3",async({page})=>{
// console.log("This is test 3")
// })


