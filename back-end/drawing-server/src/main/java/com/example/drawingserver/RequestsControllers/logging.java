package com.example.drawingserver.RequestsControllers;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;


@Aspect
@Component
public class logging {
   
  /*getting the loggin and variable before enter the methode in request pakege*/
    @Before("execution(* com.example.drawingserver.RequestsControllers.*.*(..)) && args(..)")
    public void beforeAdvice(JoinPoint joinPoint){
        int x=0;
        System.out.println("argument before enter the method");
        x++;
        Object[] signatureArgs = joinPoint.getArgs();
        for (Object signatureArg: signatureArgs) {
      System.out.println("Arg "+x+": "+signatureArg);
   }
 } 

 /*getting the loggin and return after enter the methode in request pakege*/
   @AfterReturning(value="execution(* com.example.drawingserver.RequestsControllers.*.*(..))",returning = "result")
   public void afterAdvice(JoinPoint joinPoint ,Object result){
    System.out.println("returned value:"+result);
   }
}
