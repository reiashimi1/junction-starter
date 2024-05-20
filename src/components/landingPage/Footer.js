import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import LinkButton from "@/core/buttons/LinkButton";
import * as React from "react";

const Footer = () => {
  return (
    <div className="pt-20 flex justify-center bg-gradient-to-b from-midnightBlue-900 to-darkSlateBlue-900 text-white">
      <div className="flex sm:flex-row flex-col sm:justify-around sm:space-x-16 w-full 2xl:max-w-7xl xl:max-w-5xl lg:max-w-4xl max-w-2xl md:p-8 p-4 text-sm">
        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="mb-4 font-bold">Address</div>
          <div>Halifax, Dartmouth, Bedford</div>
          <div className="py-2 text-center">
            10 - 225 The East Mall Toronto Ontario - M9B 0A9 Suite 1656
          </div>
        </div>
        <div className="flex flex-1 sm:my-0 my-12 justify-center">
          <LinkButton
            text="Terms and conditions"
            href="/terms-and-conditions"
            variant="inherit"
            bold
            className="-ml-4 hover:none"
          />
        </div>
        <div className="flex flex-col flex-1 items-center">
          <div className="font-bold">Get in touch</div>
          <div className="mt-4 mb-2 font-semibold">
            <LinkButton
              text="Send email to us"
              href="/contact-us"
              variant="inherit"
              className="hover:none"
            />
          </div>
          {/*<div className="flex">*/}
          {/*  <LinkButton*/}
          {/*    text={<Facebook />}*/}
          {/*    href=""*/}
          {/*    color="inherit"*/}
          {/*    target="_blank"*/}
          {/*    className="hover:scale-105 -ml-4"*/}
          {/*    showWaitLoader={false}*/}
          {/*  />*/}
          {/*  <LinkButton*/}
          {/*    text={<LinkedIn />}*/}
          {/*    href="https://www.linkedin.com/in/rei-ashimi-01777820a/"*/}
          {/*    color="inherit"*/}
          {/*    target="_blank"*/}
          {/*    className="hover:scale-105 -ml-4"*/}
          {/*    showWaitLoader={false}*/}
          {/*  />*/}
          {/*  <LinkButton*/}
          {/*    text={<Instagram />}*/}
          {/*    href=""*/}
          {/*    color="inherit"*/}
          {/*    target="_blank"*/}
          {/*    className="hover:scale-105 -ml-4"*/}
          {/*    showWaitLoader={false}*/}
          {/*  />*/}
          {/*  <LinkButton*/}
          {/*    text={<Twitter />}*/}
          {/*    href=""*/}
          {/*    color="inherit"*/}
          {/*    target="_blank"*/}
          {/*    className="hover:scale-105 -ml-4"*/}
          {/*    showWaitLoader={false}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default Footer;
