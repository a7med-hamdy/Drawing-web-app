package com.example.drawingserver.RequestsControllers;
import org.aspectj.internal.lang.annotation.*;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.reflect.MethodSignature;


@Aspect
@Component
public class logging {
    //Pointcut to execute on all the methods of classes in a package
    @Pointcut("within(com.example.drawingserver.RequestsControllers.*)")
        public void allMethodsPointcut(){}
    @Before("allMethodsPointcut()")
    public void beforeAdvice(){
        System.out.println("test 123.");
     } 
}
