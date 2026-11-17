import{test,expect} from "@playwright/test"

test.describe("Group1",async()=>{
test("test1",async({page})=>{
console.log("This is test 1")
})

test("test2",async({page})=>{
console.log("This is test 2")
})
})

test.describe("Group2",async()=>{
test("test3",async({page})=>{
console.log("This is test 3")
})

test("test4",async({page})=>{
console.log("This is test 4")
})

test("test5",async({page})=>{
console.log("This is test 5")
})
})

