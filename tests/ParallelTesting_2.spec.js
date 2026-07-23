import{expect,test}from'@playwright/test';
test('Testcase2.1',async({page})=>{
await page.goto('https://github.com/deepika-nagarajan-git');
});

test('Testcase2.2', async({page})=>{
await page.goto('https://learn.microsoft.com/en-us/collections/n5p4a5z7keznp5');
});

test('Testcase2.3', async({page})=>{
await page.goto('https://learn.microsoft.com/en-us/credentials/certifications/github-actions/?practice-assessment-type=certification');
});