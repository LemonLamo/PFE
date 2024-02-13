package com.santedz.medicalife

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.ImageButton
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.text.HtmlCompat
import androidx.core.view.size
import androidx.viewpager.widget.ViewPager
import androidx.viewpager.widget.ViewPager.OnPageChangeListener


class OnboardingActivity : AppCompatActivity() {

    var slideViewPager: ViewPager? = null
    var backButton: ImageButton? = null
    var nextButton: ImageButton? = null
    var skipButton: Button? = null
    var dotIndicator: LinearLayout? = null
    var dots: Array<TextView>? = null
    var viewPagerAdapter: ViewPagerAdapter? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_onboarding)

        backButton = findViewById<ImageButton>(R.id.backButton)
        nextButton = findViewById<ImageButton>(R.id.nextButton)
        skipButton = findViewById<Button>(R.id.skipButton)

        backButton!!.setOnClickListener {
            if (getItem(0) > 0) {
                slideViewPager!!.setCurrentItem(getItem(-1), true)
            }
        }
        nextButton!!.setOnClickListener({
            if (getItem(0) < 2) slideViewPager!!.setCurrentItem(getItem(1), true) else {
                val i: Intent = Intent(this@OnboardingActivity,MainActivity::class.java)
                startActivity(i)
                finish()
            }
        })
        skipButton!!.setOnClickListener({
            val i = Intent(this@OnboardingActivity, MainActivity::class.java )
            startActivity(i)
            finish()
        })

        slideViewPager = findViewById<ViewPager>(R.id.slideViewPager);
        dotIndicator = findViewById<LinearLayout>(R.id.dotIndicator);

        viewPagerAdapter = ViewPagerAdapter(this);
        slideViewPager!!.setAdapter(viewPagerAdapter);

        setDotIndicator(0);
        slideViewPager!!.addOnPageChangeListener(viewPagerListener);
    }

    var viewPagerListener: OnPageChangeListener = object : OnPageChangeListener {
        override fun onPageScrolled(
            position: Int,
            positionOffset: Float,
            positionOffsetPixels: Int
        ) {
        }

        override fun onPageSelected(position: Int) {
            setDotIndicator(position)

            if (position > 0)
                backButton!!.visibility = View.VISIBLE
            else
                backButton!!.visibility = View.INVISIBLE

            if (position == viewPagerAdapter!!.getCount()-1)
                nextButton!!.setImageResource(R.drawable.check_solid)
            else
                nextButton!!.setImageResource(R.drawable.baseline_arrow_forward_24)
        }

        override fun onPageScrollStateChanged(state: Int) {}
    }

    fun setDotIndicator(position: Int) {
        dots = Array<TextView>(viewPagerAdapter!!.getCount()){TextView(this)}
        dotIndicator!!.removeAllViews()
        for (i in 0 until dots!!.size) {
            dots!!.get(i)!!.setText(HtmlCompat.fromHtml("&#8226", HtmlCompat.FROM_HTML_MODE_LEGACY))
            dots!!.get(i)!!.setTextSize(35.0f)
            dots!!.get(i)!!.setTextColor(resources.getColor(R.color.colorPrimaryLight))
            dotIndicator!!.addView(dots!!.get(i))
        }
        dots!!.get(position)!!.setTextColor(resources.getColor(R.color.colorPrimary))
    }
    private fun getItem(i: Int): Int {
        return slideViewPager!!.currentItem + i
    }
}