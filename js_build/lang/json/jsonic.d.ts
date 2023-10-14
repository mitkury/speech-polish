export default jsonic;
declare function jsonic(src: any): any;
declare namespace jsonic {
    function noConflict(): (src: any) => any;
    function stringify(val: any, callopts: any): any;
}
