/**
 * entry
 */
console.log('hello typescript')

require('tslib')

function f() {  //当调用C类method方法时其执行顺序是
    console.log('f(): evaluated')   //-- 1
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('f(): called')   //--4 
        return {
            value(...args: any[]) {
                console.log('fffff', args)
                descriptor.value.apply(this, args)
                // return 'f'
            }
        }
    }
}

function g() {
    console.log('g(): evaluated')  //--2
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('g(): called') //--3 
        return {
            value(...args: any[]) {
                console.log('gggg', args)
                descriptor.value.apply(this, args)
                return 'g'
            }
        }
    }
}

class C {
    @f()
    @g()
    method(xxx): any {
        console.log(111)
        return 'method'
    }  // --5
}

const c1 = new C()
console.log(c1.method('xxx'))