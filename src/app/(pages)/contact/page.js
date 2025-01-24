'use client';
import { redirected, useRedirect } from '@/app/hooks/useRedirect';

import { IconBrandDiscord } from '@tabler/icons-react';

import Navbar from '@/app/components/navigation/Navbar';
import Footer from '@/app/components/navigation/Footer';

import { Copy, Check } from 'react-feather';
import projectData from '@/app/project-data.json';
import { useState } from 'react';

export default function Contact() {
  const { redirected, runRedirect } = useRedirect();
  const [copiedStates, setCopiedStates] = useState({});

  const copyContact = (contact) => {
    navigator.clipboard.writeText(contact);

    setCopiedStates((prev) => {
      const newCopiedStates = {};
      Object.keys(prev).forEach((key) => {
        newCopiedStates[key] = key === false;
      });
      return newCopiedStates;
    });

    setCopiedStates((prev) => ({
      ...prev,
      [contact]: true,
    }));

    setTimeout(() => {
      setCopiedStates((prev) => ({
        ...prev,
        [contact]: false,
      }));
    }, 1500);
  };

  const date = new Date();
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  const newDate = new Date(utcTime + 3600000 * 1);

  return (
    <main
      className={`page-scrollbar scrollbar-light dark:scrollbar-dark h-screen min-h-screen w-screen overflow-x-hidden overflow-y-scroll transition-opacity duration-300 ${redirected ? 'opacity-0' : 'opacity-100'} `}
      // style={{
      //   background: `radial-gradient(150px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 70, 110, 0.10), transparent 80%)`,
      // }}
    >
      <Navbar redirected={redirected} runRedirect={runRedirect} />
      <div className="flex h-full flex-col items-center justify-between pt-44 font-normal text-nero-800 dark:text-nero-200">
        <div className="container flex w-full flex-col items-start justify-start gap-y-2">
          <h3 className="text-3xl font-semibold">Contact</h3>
          <p>
            The time for me is currently{' '}
            <span className="font-bold">
              {newDate.getHours()}:{newDate.getMinutes()}
            </span>
            .{' '}
            {(newDate.getHours() >= 23 || newDate.getHours() <= 9) && (
              <span>I may be late to your message. </span>
            )}
            I will try to respond as soon as possible.
          </p>
          {projectData.links.contact.length > 0 &&
            projectData.links.contact.map((link) => {
              return (
                <div className="flex" key={link.id}>
                  <p>{link.title}:&nbsp;</p>
                  <div
                    className="group/link flex cursor-pointer items-center gap-x-2 text-nero-400 transition-all hover:font-medium hover:text-nero-900 dark:hover:text-nero-50"
                    onClick={() => copyContact(link.contact)}
                  >
                    <span className="">{link.contact}</span>
                    <span
                      className={`${copiedStates[link.contact] ? '' : 'opacity-0 group-hover/link:opacity-100'}`}
                    >
                      {copiedStates[link.contact] ? (
                        <Check
                          className={`h-4 w-4 ${copiedStates[link.contact] ? 'text-green-500' : ''}`}
                        />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        <Footer />
      </div>
    </main>
  );
}
