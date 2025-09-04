import React, { useState } from 'react';
import { Shield, FileText, CheckCircle, Calculator, BookOpen, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

const Module4: React.FC = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [activeOther, setActiveOther] = useState('lease-term');

  // centralised content (used for UI and PDF)
  const content = {
    introduction: {
      title: '1.1 Scope of the Application',
      paragraphs: [
        "The document presents the Bank’s approach to the application of IFRS 16 Leases: regulations on:",
      ],
      bullets: [
        'Identification and measurement of lease arrangements and their treatment in the financial statements of the Bank.',
        'Recognition of interest expense and depreciation on lease liabilities measured at amortized cost and right of use (ROU) assets.'
      ],
      covered: [
        'Off-Balance sheet leases',
        'Land and buildings',
        'Aircraft',
        'Landed properties for executive or management staff or expatriates',
        'Machinery / equipment',
        'Other temporary or not wholly-owned assets within the Bank’s control for which it possesses the right of use and has the ability to obtain all economic benefits'
      ],
      excluded: [
        'Off-balance sheet leases',
        'Short-term leases',
        'Low-value assets'
      ],
      closing: [
        'This model (“Model”) has been developed to provide high-level indicative results of the Bank\'s leased assets. The Model has been prepared to report information that faithfully represents lease transactions and provides the Bank with a basis for users of financial statements to assess the amount, timing and uncertainty of cash flows arising from leased asset based on the provisions of IFRS 16.',
        'To meet this objective, the Bank is expected to recognize assets and liabilities arising from a lease from the commencement date of the contract.',
        'In order to facilitate understanding of this methodological framework, the key terms and their relevant meaning are summarized in Appendix 1 – Glossary of Terms.'
      ]
    },

    assumptions: {
      title: 'General IFRS 16 Assumptions',
      paragraphs: [
        'In this chapter general IFRS assumptions regarding the measurement of the Right of use assets are described. A detailed description of the practical implementation of the model methodology in the Bank is presented in subsequent chapters.',
      ]
    },

    identification: {
      title: 'Identification of Right of Use Asset',
      heading: 'Recognition of Right of Use Assets',
      paragraphs: [
        "The approach in IFRS 16 is based on control and economic benefit. Therefore, the Bank recognizes a 'right-of-use' asset for all leases (subject to specified exemptions), which represents its right to use the underlying leased asset for the period of the lease.",
        "The only exception is for short-term and low-value leases or for contracts for which the Bank cannot validate the extent to which it controls the assets or where substantial economic benefits do not flow to the Bank."
      ]
    },

    measurement: {
      title: 'Measurement of Lease Liability',
      heading: 'Approach to the Measurement of Lease Liability',
      paragraphs: [
        'The general approach and a requirement by the standard on the measurement of lease liabilities are to initially determine the present value of lease payments discounted using the discount rate implicit in the lease (or if that rate cannot be readily determined the lessee\'s incremental borrowing rate).',
        'The approach adopted by the Bank is the use of incremental borrowing costs. The date of initial recognition or contract start date is important in measuring the lease liability as it is the date by which the Bank receives the contractual right to control the use of the asset.'
      ]
    },

    other: {
      title: 'Other Assumptions',
      subsections: {
        'lease-term': {
          title: 'Lease Term',
          paragraphs: [
            'In principle, a lessee is required to reassess whether it is reasonably certain to exercise an extension option, or not to exercise a termination option, upon the occurrence of either a significant event or a significant change in circumstances that:',
          ],
          bullets: [
            'It is within the control of the lessee',
            'Affects whether the lessee is reasonably certain to exercise an option not previously included in its determination of the lease term, or not to exercise an option previously included in its determination of the lease term.'
          ],
          additional: [
            'The lease term is assumed to extend after centering judgement on reasonable and observable assumptions. IFRS 16 provides that the lessee, in determining the lease term, must also consider the periods covered by an option (enforceable right) to extend the leases if the lessee is reasonably certain to exercise that option.'
          ],
          considerations: [
            {
              title: 'Enforceable right to extend',
              text: 'Lease extension was only considered for contracts that have the extension term stated in the contract to avoid assumptions without documentary evidence especially when extension term is still subject to management decision.'
            },
            {
              title: 'Historical trend of extension',
              text: 'For contracts with validated extension enforceable rights, the Bank’s consistency in extending these contracts was used as a further basis of assumption in determining the reasonable certainty of extending the current lease contracts where extension tenor is quantifiable.'
            }
          ]
        },

        'future-payments': {
          title: 'Future Lease Payments',
          paragraphs: [
            'In principle, when assessing the lessee’s extension options, the amount of payment for the lease arrangement in any optional period must also be assessed.',
            'The Bank has made a prudent assumption that the lease payments for the optional period will rise by a certain percentage based on its location and as such will result in a rise in payments.'
          ],
          additional: [
            'In the absence of discrete property growth rates, no growth rate has been adopted. Subsequently, historical rates can be adopted as a basis of growth rate in lease payments.',
            'Where the growth rate is explicitly stated in the contract, this growth rate may be adopted for the purpose of calculating the growth rate in future lease payments.'
          ]
        },

        'discount-rate': {
          title: 'Discount Rate (IBR)',
          paragraphs: [
            'IFRS 16:26 stipulates that lease payments should be discounted using the interest rate implicit in the lease; or if the interest rate implicit in the lease cannot be readily determined, the lessee\'s incremental borrowing rate.',
            'The interest rate implicit in the lease (IRIL) is ideally to be made available in lease contracts. However, this was undeterminable at transition.',
            'The Bank’s IBR has been adopted as the lease liability discounting rate.'
          ],
          bullets: [
            'Similar term',
            'Similar security',
            'Similar economic environment'
          ],
          note: 'IBR is the rate of interest that the Bank would have to pay to borrow over a similar term, and with a similar security, the funds necessary to obtain an asset of a similar value to the right-of-use asset in a similar economic environment.'
        },

        'structure': {
          title: 'Structure in Lease Payments',
          paragraphs: [
            'It is an assumption that the Bank will always pay in advance for all its lease arrangements at the inception of the contract. These payments are also assumed to be consistent over the months for which they have been prepaid.',
            'In such cases, the Bank uses its experienced judgement to estimate the amount of any impairment loss.'
          ]
        }
      }
    }
  };

  // ✅ fix: define subsections list so UI doesn't break
  const otherSubsections = [
    { id: 'lease-term', title: 'Lease Term' },
    { id: 'future-payments', title: 'Future Lease Payments' },
    { id: 'discount-rate', title: 'Discount Rate (IBR)' },
    { id: 'structure', title: 'Structure in Lease Payments' },
  ];

  // create a sequential PDF based on the content object (text-only, sequential)
  const handleDownload = () => {
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const maxWidth = pageWidth - margin * 2;
    let y = 20;

    const writeTitle = (text: string) => {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, margin, y);
      y += lines.length * 7 + 4;
      if (y > pageHeight - 20) { pdf.addPage(); y = 20; }
    };

    const writeParagraph = (text: string) => {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, margin, y);
      y += lines.length * 6 + 4;
      if (y > pageHeight - 20) { pdf.addPage(); y = 20; }
    };

    const writeBulletList = (items: string[]) => {
      items.forEach((it) => {
        writeParagraph('• ' + it);
      });
    };

    // build PDF sequentially
    writeTitle('IFRS 16 Leases Methodology');
    writeParagraph('Bank’s framework for application of IFRS 16');
    writeTitle(content.introduction.title);
    content.introduction.paragraphs.forEach(p => writeParagraph(p));
    writeBulletList(content.introduction.bullets);
    writeParagraph('Leased Assets Covered by the Model:');
    writeBulletList(content.introduction.covered);
    writeParagraph('Items Not Covered by the Model:');
    writeBulletList(content.introduction.excluded);
    content.introduction.closing.forEach(p => writeParagraph(p));

    writeTitle(content.assumptions.title);
    content.assumptions.paragraphs.forEach(p => writeParagraph(p));

    writeTitle(content.identification.title);
    writeParagraph(content.identification.heading);
    content.identification.paragraphs.forEach(p => writeParagraph(p));

    writeTitle(content.measurement.title);
    writeParagraph(content.measurement.heading);
    content.measurement.paragraphs.forEach(p => writeParagraph(p));

    writeTitle(content.other.title);
    const subs = content.other.subsections;

    writeTitle(subs['lease-term'].title);
    subs['lease-term'].paragraphs.forEach(p => writeParagraph(p));
    writeBulletList(subs['lease-term'].bullets);
    subs['lease-term'].additional.forEach(p => writeParagraph(p));
    subs['lease-term'].considerations.forEach(c => {
      writeParagraph(c.title + ':');
      writeParagraph(c.text);
    });

    writeTitle(subs['future-payments'].title);
    subs['future-payments'].paragraphs.forEach(p => writeParagraph(p));
    subs['future-payments'].additional.forEach(p => writeParagraph(p));

    writeTitle(subs['discount-rate'].title);
    subs['discount-rate'].paragraphs.forEach(p => writeParagraph(p));
    writeBulletList(subs['discount-rate'].bullets);
    writeParagraph(subs['discount-rate'].note);

    writeTitle(subs['structure'].title);
    subs['structure'].paragraphs.forEach(p => writeParagraph(p));

    pdf.save('IFRS16_Methodology.pdf');
  };

  return (
    <div className="w-full px-6 py-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">IFRS 16 Leases Methodology</h1>
            <p className="text-slate-600">Bank’s framework for application of IFRS 16</p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Navigation */}
      <div className="border-b border-slate-200 mb-8">
        <nav className="flex flex-wrap space-x-4">
          {[
            { id: 'introduction', title: 'Introduction & Scope', icon: Shield },
            { id: 'assumptions', title: 'General IFRS 16 Assumptions', icon: FileText },
            { id: 'identification', title: 'Identification of ROU Asset', icon: CheckCircle },
            { id: 'measurement', title: 'Measurement of Lease Liability', icon: Calculator },
            { id: 'other', title: 'Other Assumptions', icon: BookOpen }
          ].map((section) => {
            const Icon = section.icon as any;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 py-2 px-3 border-b-2 font-medium text-sm transition-colors ${
                  activeSection === section.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{section.title}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sections */}
      <div className="space-y-8 w-full">
        {activeSection === 'introduction' && (
          <div className="bg-white rounded-lg shadow-sm border p-6 w-full space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">{content.introduction.title}</h2>
            <p className="text-slate-600">{content.introduction.paragraphs[0]}</p>

            <ul className="list-disc pl-6 text-slate-600 space-y-1">
              {content.introduction.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Leased Assets Covered by the Model</h3>
                <ul className="list-disc pl-6 text-blue-800 space-y-1 text-sm">
                  {content.introduction.covered.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4">
                <h3 className="font-semibold text-emerald-900 mb-2">Items Not Covered by the Model</h3>
                <ul className="list-disc pl-6 text-emerald-800 space-y-1 text-sm">
                  {content.introduction.excluded.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            </div>

            {content.introduction.closing.map((p, i) => <p key={i} className="text-slate-600">{p}</p>)}
          </div>
        )}

        {activeSection === 'assumptions' && (
          <div className="bg-white rounded-lg shadow-sm border p-6 w-full">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{content.assumptions.title}</h2>
            {content.assumptions.paragraphs.map((p, i) => <p key={i} className="text-slate-600 mb-2">{p}</p>)}
          </div>
        )}

        {activeSection === 'identification' && (
          <div className="bg-white rounded-lg shadow-sm border p-6 w-full space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">{content.identification.title}</h2>
            <h3 className="font-medium text-slate-800">{content.identification.heading}</h3>
            {content.identification.paragraphs.map((p, i) => <p key={i} className="text-slate-600">{p}</p>)}
          </div>
        )}

        {activeSection === 'measurement' && (
          <div className="bg-white rounded-lg shadow-sm border p-6 w-full space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">{content.measurement.title}</h2>
            <h3 className="font-medium text-slate-800">{content.measurement.heading}</h3>
            {content.measurement.paragraphs.map((p, i) => <p key={i} className="text-slate-600">{p}</p>)}
          </div>
        )}

        {activeSection === 'other' && (
          <div className="bg-white rounded-lg shadow-sm border p-6 w-full space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{content.other.title}</h2>

            {/* Sub-navigation */}
            <div className="border-b border-slate-200 mb-6">
              <nav className="flex flex-wrap space-x-4">
                {otherSubsections.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveOther(sub.id)}
                    className={`py-2 px-3 border-b-2 font-medium text-sm transition-colors ${
                      activeOther === sub.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {sub.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Subsections content */}
            {activeOther === 'lease-term' && (
              <div>
                <h3 className="font-medium text-slate-800 mb-2">{content.other.subsections['lease-term'].title}</h3>
                {content.other.subsections['lease-term'].paragraphs.map((p, i) => (
                  <p key={i} className="text-slate-600 mb-2">{p}</p>
                ))}
                <ul className="list-disc pl-6 text-slate-600 mb-2">
                  {content.other.subsections['lease-term'].bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                {content.other.subsections['lease-term'].additional.map((p, i) => (
                  <p key={i} className="text-slate-600 mb-2">{p}</p>
                ))}
                {content.other.subsections['lease-term'].considerations.map((c, i) => (
                  <div key={i} className="mb-3">
                    <h4 className="font-semibold text-slate-700">{c.title}</h4>
                    <p className="text-slate-600">{c.text}</p>
                  </div>
                ))}
              </div>
            )}

            {activeOther === 'future-payments' && (
              <div>
                <h3 className="font-medium text-slate-800 mb-2">{content.other.subsections['future-payments'].title}</h3>
                {content.other.subsections['future-payments'].paragraphs.map((p, i) => (
                  <p key={i} className="text-slate-600 mb-2">{p}</p>
                ))}
                {content.other.subsections['future-payments'].additional.map((p, i) => (
                  <p key={i} className="text-slate-600 mb-2">{p}</p>
                ))}
              </div>
            )}

            {activeOther === 'discount-rate' && (
              <div>
                <h3 className="font-medium text-slate-800 mb-2">{content.other.subsections['discount-rate'].title}</h3>
                {content.other.subsections['discount-rate'].paragraphs.map((p, i) => (
                  <p key={i} className="text-slate-600 mb-2">{p}</p>
                ))}
                <ul className="list-disc pl-6 text-slate-600 mb-2">
                  {content.other.subsections['discount-rate'].bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <p className="text-slate-600">{content.other.subsections['discount-rate'].note}</p>
              </div>
            )}

            {activeOther === 'structure' && (
              <div>
                <h3 className="font-medium text-slate-800 mb-2">{content.other.subsections['structure'].title}</h3>
                {content.other.subsections['structure'].paragraphs.map((p, i) => (
                  <p key={i} className="text-slate-600 mb-2">{p}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Module4;
